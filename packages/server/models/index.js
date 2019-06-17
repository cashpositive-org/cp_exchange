const mongoose = require('mongoose');

const testSchema = require('./test');

const exportModels = {
  Test: mongoose.model('Test', testSchema),
};

Object.values(exportModels).forEach(model => {
  model.createCollection();
});

module.exports = exportModels;
