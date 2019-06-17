const { Test } = require('../models');

async function getTestMessage() {
  return Test.find({})
    .lean()
    .exec();
}

module.exports = {
  getTestMessage,
};
