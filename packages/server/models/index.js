const mongoose = require('mongoose');

const accountSchema = require('./account');
const transferSchema = require('./transfer');

const exportModels = {
  Account: mongoose.model('Account', accountSchema),
  Transfer: mongoose.model('Transfer', transferSchema),
};

Object.values(exportModels).forEach(model => {
  model.createCollection();
});

module.exports = exportModels;
