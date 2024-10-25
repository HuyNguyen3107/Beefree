const { Page_Project } = require("../models/index");
const { Op } = require("sequelize");

module.exports = {
  getPageProjects: async (req) => {
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
    const { count, rows: data } = await Page_Project.findAndCountAll({
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
  getPageProject: (condition) => {
    return Page_Project.findOne({ where: condition });
  },
  createPageProject: (data) => {
    return Page_Project.create(data);
  },
  updatePageProject: (data, condition) => {
    return Page_Project.update(data, { where: condition });
  },
  deletePageProject: (condition) => {
    return Page_Project.destroy({ where: condition });
  },
  deleteAll: () => {
    return Page_Project.destroy({ truncate: true });
  },
};
