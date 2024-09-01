//Base Repository
module.exports = class {
  constructor() {
    this.model = this.getModel();
  }
  create(data) {
    //Gọi hàm model
    return this.model.create(data);
  }
  update(data = {}, condition = {}) {
    //Gọi hàm model
    return this.model.update(data, condition);
  }
  updateByPk(id) {
    //Gọi hàm model
    return this.model.update(data, { where: { id } });
  }
  delete(condition = {}) {
    //Gọi hàm model
    return this.model.destroy(condition);
  }
  deleteByPk(id) {
    //Gọi hàm model
    return this.model.destroy({ where: { id } });
  }
  find(condition = {}) {
    //Gọi hàm model
    return this.model.findOne(condition);
  }
  findByPk(id) {
    //Gọi hàm model
    return this.model.findByPk(id);
  }
  findAll(options = {}) {
    //Gọi hàm model
    return this.model.findAll(options);
  }
  findAndCountAll(options = {}) {
    return this.model.findAndCountAll(options);
  }
};
