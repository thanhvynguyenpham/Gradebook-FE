export function getLocalAccessToken() {
  const accessToken = localStorage.getItem("access_token");
  return accessToken;
}

export function getLocalRefreshToken() {
  const refreshToken = localStorage.getItem("refresh_token");
  return refreshToken;
}

export function getLocalUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
}

export function setLocalAccessToken(value) {
  localStorage.setItem("access_token", value);
}

export function setLocalRefreshToken(value) {
  localStorage.setItem("refresh_token", value);
}

export function setLocalUser(value) {
  localStorage.setItem("user", JSON.stringify(value));
}

export function setLocalUserName(value) {
  const curUser = getLocalUser();
  if (!value || !curUser) return;
  const updatedUser = {
    id: curUser.id,
    email: curUser.email,
    firstName: value.firstName,
    lastName: value.lastName,
    name: value.firstName + " " + value.lastName,
  };
  localStorage.setItem("user", JSON.stringify(updatedUser));
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
