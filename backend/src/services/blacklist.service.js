const { Blacklist_Token } = require("../models/index");
module.exports = {
  getBlacklistToken: (condition) => {
    return Blacklist_Token.findOne({ where: condition });
  },
  createBlacklistToken: (data) => {
    return Blacklist_Token.create(data);
  },
};
