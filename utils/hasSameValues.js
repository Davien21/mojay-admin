export const hasSameValues = (obj, objectToCompare) => {
  obj = { ...obj };
  objectToCompare = { ...objectToCompare };
  // console.log({ obj, objectToCompare });
  if (Object.keys(obj).length !== Object.keys(objectToCompare)) return false;

  for (let eachKey in obj) {
    if (obj[eachKey] === objectToCompare[eachKey]) {
      continue;
    }
    console.log({ a: obj[eachKey] });
    return false;
  }

  return true;
};
