const { Password_Token } = require("../models/index");
module.exports = {
  addPasswordToken: (data) => {
    return Password_Token.create(data);
  },
  deletePasswordToken: (condition) => {
    return Password_Token.destroy({ where: condition });
  },
  getPasswordToken: (condition) => {
    return Password_Token.findOne({ where: condition });
  },
};
