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

export function addID(arrays, keyword) {
  arrays.forEach((item, index) => {
    item.id = keyword + "-" + index;
  });
  return arrays;
}

export const convertToJson = (csv, headers) => {
  var lines = csv.split("\n");

  var result = [];

  for (var i = 1; i < lines.length && lines[i]; i++) {
    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }
  return result;
};
