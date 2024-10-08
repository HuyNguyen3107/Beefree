// const UserRepository = require("../repositories/user.repository");
// const userRepository = new UserRepository();
const { User } = require("../models/index");
module.exports = {
  getUser: (condition) => {
    // return userRepository.getUser(condition);
    return User.findOne({ where: condition });
  },
  createUser: (data) => {
    // return userRepository.createUser(data);
    return User.create(data);
  },
  updateUser: (data, condition) => {
    // return userRepository.updateUser(data, condition);

    return User.update(data, { where: condition });
  },
};
