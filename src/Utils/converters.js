export function nameToAvatar(name) {
  if (name === undefined) return name;
  const lstName = name.split(" ");
  return lstName[0].slice(0, 1) + (lstName[1] ? lstName[1].slice(0, 1) : "");
}

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
