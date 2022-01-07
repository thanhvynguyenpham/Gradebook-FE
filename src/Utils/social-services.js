import { post } from "./httpHelpers";

export function googleAuth(token) {
  const body = {
    token: token,
  };
  return post(`/auth/google`, body);
}
export function facebookAuth(token) {
  const body = {
    access_token: token,
  };
  return post(`/auth/facebook`, body);
}
