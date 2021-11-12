import axios from "axios";
import Cookies from "js-cookie";
const endpoint = process.env.REACT_APP_API_LINK;
export function get(url) {
  return axios.get(endpoint + url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export function post(url, body) {
  return axios.post(endpoint + url, body, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

export function getAuth(url) {
  return axios.get(endpoint + url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "x-access-token": JSON.stringify(Cookies.get("access_token")),
    },
  });
}

export function postAuth(url, body) {
  return axios.post(endpoint + url, body, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=utf-8",
      "x-access-token": JSON.stringify(Cookies.get("access_token")),
    },
  });
}

export function refreshToken() {
  axios
    .post(
      endpoint + "/api/auth/refresh",
      JSON.stringify({
        accessToken: Cookies.get("access_token"),
        refreshToken: Cookies.get("refresh_token"),
      })
    )
    .then((response) => {
      if (response.status === 200) {
        Cookies.set("access_token", response.data.accessToken);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
