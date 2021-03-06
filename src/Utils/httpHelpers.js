import axios from "axios";
import {
  clearLocalStorage,
  getLocalAccessToken,
  getLocalRefreshToken,
  setLocalAccessToken,
} from "./localStorageGetSet";
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

const instance = axios.create({
  baseURL: endpoint,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json; charset=utf-8",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      // Access Token was expired
      if (
        err.response.status === 401 &&
        !originalConfig._retry &&
        err.response.data.message ===
          "Not found or Invalid or Expired access token."
      ) {
        originalConfig._retry = true;

        try {
          const rs = await refreshToken();
          const { accessToken } = rs.data;
          setLocalAccessToken(accessToken);
          instance.defaults.headers["Authorization"] = "Bearer " + accessToken;

          return instance(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }

      if (err.response.status === 413 && err.response.data) {
        clearLocalStorage();
        window.location.replace("/login");
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);

export function refreshToken() {
  const access_token = getLocalAccessToken();
  const refresh_token = getLocalRefreshToken();
  if (!refresh_token || !access_token) {
    window.location.replace("/login");
    return;
  }

  return instance.post("/auth/refresh", {
    accessToken: access_token,
    refreshToken: refresh_token,
  });
}
export function getAuth(url) {
  return instance.get(endpoint + url);
}

export function postAuth(url, body) {
  return instance.post(endpoint + url, body);
}

export function patchAuth(url, body) {
  return instance.patch(endpoint + url, body);
}

export function deleteAuth(url) {
  return instance.delete(endpoint + url);
}
