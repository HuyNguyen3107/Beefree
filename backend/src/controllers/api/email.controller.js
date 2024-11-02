const responses = require("../../helpers/response");
const emailProjectService = require("../../services/emailProject.service");
const EmailProjectTransformer = require("../../transformers/email.transformer");
const { convertObjectKeys } = require("../../utils/convert");

module.exports = {
  index: async (req, res, next) => {
    try {
      const data = await emailProjectService.getEmailProjects(req);
      if (!data.data.length) {
        return responses.errorResponse(res, 404, "Data not found");
      }
      const emailProjectList = data.data.map(
        (emailProject) => new EmailProjectTransformer(emailProject)
      );
      return responses.successResponse(
        res,
        200,
        "Successfully",
        emailProjectList,
        {
          total: data.total,
          current_page: data.current_page,
          per_page: data.per_page,
        }
      );
      // return
    } catch (error) {
      return responses.errorResponse(res, 500, "Server Error");
    }
  },
  find: async (req, res, next) => {
    try {
      const data = await emailProjectService.getEmailProject({
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
        new EmailProjectTransformer(data)
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
      const check = await emailProjectService.getEmailProject({
        project_id: data.project_id,
        user_id: req.user.id,
      });
      if (check) {
        return responses.errorResponse(res, 400, "Data already exists");
      }

      if (!data.project_id) {
        return responses.errorResponse(res, 400, "Project ID is required");
      }
      const emailProject = await emailProjectService.createEmailProject(data);
      if (!emailProject) {
        // status for failed to create
        return responses.errorResponse(res, 400, "Failed to create");
      }
      return responses.successResponse(res, 201, "Successfully");
    } catch (error) {
      console.log(error);
      return responses.errorResponse(res, 500, "Server Error");
    }
  },
  update: (req, res, next) => {
    // code here
    try {
      let data = req.body;
      if (!data) {
        return responses.errorResponse(res, 400, "Data ís required");
      }
      data = convertObjectKeys(data);
      const emailProject = emailProjectService.updateEmailProject(data, {
        project_id: req.params.id,
        user_id: req.user.id,
      });
      if (!emailProject) {
        // status for failed to update
        return responses.errorResponse(res, 400, "Failed to update");
      }
      return responses.successResponse(res, 200, "Successfully");
    } catch (error) {
      return responses.errorResponse(res, 500, "Server Error");
    }
  },
  delete: async (req, res, next) => {
    try {
      const emailProject = await emailProjectService.deleteEmailProject({
        project_id: req.params.id,
        user_id: req.user.id,
      });
      if (!emailProject) {
        return responses.errorResponse(res, 400, "Failed to delete");
      }
      return responses.successResponse(res, 200, "Successfully");
    } catch (error) {
      return responses.errorResponse(res, 500, "Server Error");
    }
  },
  deleteAll: async (req, res, next) => {
    try {
      const emailProject = await emailProjectService.deleteAll();
      if (!emailProject) {
        return responses.errorResponse(res, 400, "Failed to delete");
      }
      return responses.successResponse(res, 200, "Successfully");
    } catch (error) {
      return responses.errorResponse(res, 500, "Server Error");
    }
  },
};
