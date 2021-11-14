export function getLocalAccessToken() {
  const accessToken = localStorage.getItem("access_token");
  return accessToken;
}

export function getLocalRefreshToken() {
  const refreshToken = localStorage.getItem("refresh_token");
  return refreshToken;
}

export function getLocalUser() {
  const user = localStorage.getItem("user");
  return user;
}

export function setLocalAccessToken(value) {
  localStorage.setItem("access_token", value);
}

export function setLocalRefreshToken(value) {
  localStorage.setItem("refresh_token", value);
}

export function setLocalUser(value) {
  localStorage.setItem("user", value);
}

export function clearLocalStorage() {
  localStorage.clear();
}

export function removeAccessToken() {
  localStorage.removeItem("access_token");
}

export function removeRefreshToken() {
  localStorage.removeItem("refresh_token");
}
