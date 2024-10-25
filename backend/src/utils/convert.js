// convert camelCase to snake_case

const camelToSnake = (str) => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

module.exports = {
  convertObjectKeys: (obj) => {
    const newObj = {};
    for (const key in obj) {
      newObj[camelToSnake(key)] = obj[key];
    }
    return newObj;
  },
};
