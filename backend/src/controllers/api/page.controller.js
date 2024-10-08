const responses = require("../../helpers/response");
const { Op } = require("sequelize");

module.exports = {
  index: async (req, res, next) => {
    try {
      return responses.successResponse(res, 200, "Success", "Hello World");
    } catch (error) {
      return responses.errorResponse(res, 500, "Server Error");
    }
  },
};
