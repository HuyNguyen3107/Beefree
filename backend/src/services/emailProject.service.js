const { Email_Project } = require("../models/index");
const { Op } = require("sequelize");

module.exports = {
  getEmailProjects: async (req) => {
    const {
      _sort = "id",
      _order = "asc",
      q,
      _limit = 10,
      _page = 1,
    } = req.query;
    const where = {};
    if (q) {
      where[Op.or] = [
        { name: { [Op.like]: `%${q}%` } },
        { type: { [Op.like]: `%${q}%` } },
        { user_id: { [Op.like]: `%${req.user.id}%` } },
      ];
    }
    const offset = (_page - 1) * _limit;
    const { count, rows: data } = await Email_Project.findAndCountAll({
      where,
      order: [[_sort, _order]],
      limit: _limit,
      offset,
    });
    if (!data) {
      return {
        data: [],
        total: 0,
        current_page: _page,
        per_page: _limit,
      };
    }
    return {
      data,
      total: count,
      current_page: _page,
      per_page: _limit,
    };
  },
  getEmailProject: (condition) => {
    return Email_Project.findOne({ where: condition });
  },
  createEmailProject: (data) => {
    return Email_Project.create(data);
  },
  updateEmailProject: (data, condition) => {
    return Email_Project.update(data, { where: condition });
  },
  deleteEmailProject: (condition) => {
    return Email_Project.destroy({ where: condition });
  },
  deleteAll: () => {
    return Email_Project.destroy({ truncate: true });
  },
};
