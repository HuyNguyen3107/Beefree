const responses = require("../../helpers/response");
const pageProjectService = require("../../services/pageProject.service");
const PageProjectTransformer = require("../../transformers/page.transformer");
const { convertObjectKeys } = require("../../utils/convert");

module.exports = {
  index: async (req, res, next) => {
    try {
      const data = await pageProjectService.getPageProjects(req);
      if (!data.data.length) {
        return responses.errorResponse(res, 404, "Data not found");
      }
      const pageProjectList = data.data.map(
        (pageProject) => new PageProjectTransformer(pageProject)
      );
      return responses.successResponse(
        res,
        200,
        "Successfully",
        pageProjectList,
        {
          total: data.total,
          current_page: data.current_page,
          per_page: data.per_page,
        }
      );
    } catch (error) {
      return responses.errorResponse(res, 500, "Server Error");
    }
  },
  find: async (req, res, next) => {
    try {
      const data = await pageProjectService.getPageProject({
        project_id: req.params.id,
        user_id: req.user.id,
      });
      if (!data) {
        return responses.errorResponse(res, 404, "Data not found");
      }
      return responses.successResponse(
        res,
        200,
        "Successfully",
        new PageProjectTransformer(data)
      );
    } catch (error) {
      return responses.errorResponse(res, 500, "Server Error");
    }
  },
  create: async (req, res, next) => {
    // code here
    try {
      let data = req.body;
      data.user_id = req.user.id;
      if (!data) {
        return responses.errorResponse(res, 400, "Data not found");
      }
      data = convertObjectKeys(data);
      const check = await pageProjectService.getPageProject({
        project_id: data.project_id,
        user_id: data.user_id,
      });
      if (check) {
        return responses.errorResponse(res, 400, "Data already exists");
      }
      const result = await pageProjectService.createPageProject(data);
      if (!result) {
        return responses.errorResponse(res, 400, "Failed to create data");
      }
      return responses.successResponse(res, 201, "Successfully", result);
    } catch (error) {
      return responses.errorResponse(res, 500, "Server Error");
    }
  },
  update: async (req, res, next) => {
    try {
      let data = req.body;
      if (!data) {
        return responses.errorResponse(res, 400, "Data is required");
      }
      data = convertObjectKeys(data);
      const result = await pageProjectService.updatePageProject(data, {
        project_id: req.params.id,
        user_id: req.user.id,
      });
      if (!result) {
        return responses.errorResponse(res, 400, "Failed to update data");
      }
      return responses.successResponse(res, 200, "Successfully", result);
    } catch (error) {
      return responses.errorResponse(res, 500, "Server Error");
    }
  },
  delete: async (req, res, next) => {
    try {
      const result = await pageProjectService.deletePageProject({
        project_id: req.params.id,
        user_id: req.user.id,
      });
      if (!result) {
        return responses.errorResponse(res, 400, "Failed to delete data");
      }
      return responses.successResponse(res, 200, "Successfully");
    } catch (error) {
      return responses.errorResponse(res, 500, "Server Error");
    }
  },
  deleteAll: async (req, res, next) => {
    try {
      const result = await pageProjectService.deleteAll();
      if (!result) {
        return responses.errorResponse(res, 400, "Failed to delete data");
      }
      return responses.successResponse(res, 200, "Successfully");
    } catch (error) {
      return responses.errorResponse(res, 500, "Server Error");
    }
  },
};
