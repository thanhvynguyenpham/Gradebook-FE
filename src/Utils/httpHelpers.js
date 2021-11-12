import axios from "axios";
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
    },
  });
}

export function postAuth(url, body) {
  return axios.post(endpoint + url, body, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
