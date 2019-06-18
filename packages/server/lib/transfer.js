const { Account, Transfer } = require('../models');
const { runInTransaction } = require('mongoose-transact-utils');

async function executeTransfer({ payer, payee, amount }) {
  return runInTransaction(async session => {
    await Account.findByIdAndUpdate(payee, { $inc: { balance: parseFloat(amount, 10) } })
      .session(session)
      .exec();

    await Account.findByIdAndUpdate(payer, { $dec: { balance: parseFloat(amount, 10) } })
      .session(session)
      .exec();

    const newTransfer = new Transfer({ payee, payer, amount });

    await newTransfer.save({ session });

    return { status: 200, body: newTransfer };
  });
}

module.exports = executeTransfer;
