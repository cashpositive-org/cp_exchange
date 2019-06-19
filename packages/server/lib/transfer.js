const $ = require('currency.js');
const { runInTransaction } = require('mongoose-transact-utils');

const { Account, Transfer } = require('../models');

async function executeTransfer({ payer, payee, amount }) {
  if (payer === payee) {
    return { status: 406, body: { error: 'Payee and Payer cannot be the same' } };
  }

  return runInTransaction(async session => {
    const _payee = await Account.findById(payee)
      .session(session)
      .exec();

    _payee.balance = $(_payee.balance.toString()).add(amount).value;

    const _payer = await Account.findById(payer)
      .session(session)
      .exec();

    _payer.balance = $(_payer.balance.toString()).subtract(amount).value;

    const newTransfer = new Transfer({ payee, payer, amount });

    if (_payer.balance < 0) {
      return {
        status: 406,
        body: { error: 'Balance cannot be negative' },
      };
    }

    await _payee.save();
    await _payer.save();
    await newTransfer.save({ session });

    return { status: 200, body: newTransfer };
  });
}

module.exports = { executeTransfer };
