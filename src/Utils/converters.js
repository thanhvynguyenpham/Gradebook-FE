export function nameToAvatar(name) {
  if (name === undefined) return name;
  const lstName = name.split(" ");
  return lstName[0].slice(0, 1) + (lstName[1] ? lstName[1].slice(0, 1) : "");
}
