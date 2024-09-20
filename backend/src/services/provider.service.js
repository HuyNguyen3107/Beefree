// const ProviderRepository = require("../repositories/provider.repository");
// const providerRepository = new ProviderRepository();
const { Provider } = require("../models/index");
module.exports = {
  getProvider: (condition) => {
    // return providerRepository.getProvider(condition);
    return Provider.findOne({ where: condition });
  },

  createProvider: (data) => {
    // return providerRepository.createProvider(data);
    return Provider.create(data);
  },
};
