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
  const account = await Account.findById(accountId)
    .lean()
    .exec();

  if (!account) {
    return { status: 401, body: { error: 'Invalid Account ID provided' } };
  }

  return { status: 200, body: account };
}

module.exports = {
  createNewAccount,
  getAccountDetails,
};
