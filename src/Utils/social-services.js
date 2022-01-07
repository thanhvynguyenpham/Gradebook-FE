import { post } from "./httpHelpers";
import {
  setLocalAccessToken,
  setLocalRefreshToken,
  setLocalUser,
} from "./localStorageGetSet";

export function googleAuth(token) {
  const body = {
    token: token,
  };
  return post(`/auth/google`, body);
}
export async function facebookAuth(token) {
  const body = {
    access_token: token,
  };
  const response = await post(`/auth/facebook`, body);
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
  return user;
}
