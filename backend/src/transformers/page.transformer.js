const Transformer = require("../core/transformer");
module.exports = class extends Transformer {
  response(instance) {
    return {
      id: instance.id,
      projectId: instance.project_id,
      name: instance.name,
      type: instance.type,
      data: instance.data,
      tag: instance.tag,
      description: instance.description,
      metaTitle: instance.meta_title,
      metaDescription: instance.meta_description,
      status: instance.status,
      userId: instance.user_id,
      createdAt: instance.created_at,
      updatedAt: instance.updated_at,
    };
  }
};
