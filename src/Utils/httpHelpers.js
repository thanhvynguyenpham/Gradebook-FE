import axios from "axios";
const endpoint = "https://gradebook-nptv.herokuapp.com/api/v1/";
// const endpoint = "http://localhost:8080/api/v1/";

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
