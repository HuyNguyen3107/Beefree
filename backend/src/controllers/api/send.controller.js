const responses = require("../../helpers/response");
const  sendMail = require("../../utils/mail");

module.exports = {
    index: async (req, res, next) => {
        const {to, subject, message} = req.body;
        const result = await sendMail(to, subject, message);
        if (result.success) {
            return responses.successResponse(res, 200, "Success");
        } else {
            return responses.errorResponse(res, 500, "Can't send email");
        }
    }
}