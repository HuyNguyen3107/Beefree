// const UserTokenRepository = require("../repositories/userToken.repository");
// const userTokenRepository = new UserTokenRepository();
const { User_Token } = require("../models/index");
module.exports = {
  addUserToken: (data) => {
    // return userTokenRepository.createUserToken(data);
    return User_Token.create(data);
  },
  deleteUserToken: (condition) => {
    // return userTokenRepository.deleteUserToken(condition);
    return User_Token.destroy({ where: condition });
  },
  getUserToken: (condition) => {
    // return userTokenRepository.getUserToken(condition);
    return User_Token.findOne({ where: condition });
  },
};
