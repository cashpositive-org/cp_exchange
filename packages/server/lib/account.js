const _ = require('lodash');

const { Account } = require('../models');

async function createNewAccount(name) {
  const newAccount = new Account({
    name,
  });

  await newAccount.save();

  return { status: 201, body: newAccount.toObject() };
}

async function getAccountDetails(accountId) {
  const user = await Account.findById(accountId)
    .lean()
    .exec();

  if (!user) {
    return { status: 401, body: { error: 'Invalid Account ID provided' } };
  }

  return { status: 200, body: user };
}

module.exports = {
  createNewAccount,
  getAccountDetails,
};
