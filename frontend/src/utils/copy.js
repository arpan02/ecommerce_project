export const deepCopyArray = (array) => {
  let copy = [];
  array.forEach((elem) => {
    if (Array.isArray(elem)) {
      copy.push(deepCopyArray(elem));
    } else {
      if (typeof elem === 'object') {
        copy.push(deepCopyArray(elem));
      } else {
        copy.push(elem);
      }
    }
  });

  return copy;
};

export const deepCopyObject = (obj) => {
  let tempObj = {};

  for (let [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      tempObj[key] = deepCopyArray(value);
    } else if (typeof value === 'object') {
      tempObj[key] = deepCopyObject(value);
    } else {
      tempObj[key] = value;
    }
  }

  return tempObj;
};
