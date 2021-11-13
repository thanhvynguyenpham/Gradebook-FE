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

function getLocalAccessToken() {
  const accessToken = Cookies.get("access_token");
  return accessToken;
}

function getLocalRefreshToken() {
  const refreshToken = Cookies.get("refresh_token");
  return refreshToken;
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
      config.headers["x-access-token"] = token;
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
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await refreshToken();
          const { accessToken } = rs.data;
          Cookies.set("access_token", accessToken);
          instance.defaults.headers.common["x-access-token"] = accessToken;

          return instance(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);

function refreshToken() {
  return instance.post("/auth/refresh", {
    accessToken: getLocalAccessToken(),
    refreshToken: getLocalRefreshToken(),
  });
}

export function getAuth(url) {
  return instance.get(endpoint + url);
}

export function postAuth(url, body) {
  return instance.post(endpoint + url, body);
}
