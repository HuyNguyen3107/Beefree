const Transformer = require("../core/transformer");
module.exports = class extends Transformer {
  response(instance) {
    return {
      id: instance.id,
      firstName: instance.first_name,
      lastName: instance.last_name,
      email: instance.email,
      password: "Không có đâu",
      avatar: instance.avatar,
      status: instance.status,
      providerId: instance.provider_id,
      createdAt: instance.created_at,
      updatedAt: instance.updated_at,
    };
  }
};
