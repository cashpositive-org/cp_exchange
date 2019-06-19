const { Account, Transfer } = require('../models');

function getTransfers() {
  return Transfer.find({})
    .sort('createdAt')
    .limit(50)
    .populate('payee payer', '_id name')
    .lean()
    .exec();
}

async function getAccounts(id) {
  const accounts = await Account.find({})
    .select('_id name')
    .sort('createdAt')
    .lean()
    .exec();

  return accounts.filter(({ _id }) => String(_id) !== id);
}

function getAccount(id) {
  return Account.findById(id)
    .lean()
    .exec();
}

module.exports = {
  getTransfers,
  getAccounts,
  getAccount,
};
