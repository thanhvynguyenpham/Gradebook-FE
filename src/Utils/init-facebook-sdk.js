import {
  setLocalAccessToken,
  setLocalRefreshToken,
  setLocalUser,
} from "./localStorageGetSet";
import { facebookAuth } from "./social-services";

const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;

export function initFacebookSdk() {
  return new Promise((resolve) => {
    // wait for facebook sdk to initialize before starting the react app
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: facebookAppId,
        cookie: true,
        xfbml: true,
        version: "v8.0",
      });

      // auto authenticate with the api if already logged in with facebook
      window.FB.getLoginStatus(({ authResponse }) => {
        if (authResponse) {
          facebookAuth(authResponse.accessToken)
            .then((response) => {
              if (response.status === 200) {
                const user = {
                  id: response.data._id,
                  firstName: response.data.firstName,
                  lastName: response.data.lastName,
                  name: response.data.name,
                  email: response.data.email || "",
                  role: response.data.role,
                };
                setLocalAccessToken(response.data.accessToken);
                setLocalRefreshToken(response.data.refreshToken);
                setLocalUser(user);
                navigateAfterLogin();
              }
            })
            .catch((error) => {
              resolve();
            });
        } else {
          resolve();
        }
      });
    };

    // load facebook sdk script
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  });
}

const navigateAfterLogin = () => {
  const lastLocation = JSON.parse(sessionStorage.getItem("lastLocation"));
  if (lastLocation) {
    sessionStorage.removeItem("lastLocation");
    window.location.replace(lastLocation);
  } else {
    window.location.replace("/");
  }
};
