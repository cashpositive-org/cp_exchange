const { Account, Transfer } = require('../models');

function setupIO(io) {
  io.on('connection', async function(socket) {
    const id = socket.handshake.query.id;

    const accounts = await Account.find({ _id: { $ne: id } })
      .select('_id name')
      .sort('-createdAt')
      .lean()
      .exec();

    // const transfers = await Transfer.find({ $or: [{ payee: id }, { payer: id }] })
    //   .sort('-createdAt')
    //   .limit(50)
    //   .populate('payee payer', '_id name')
    //   .lean()
    //   .exec();

    socket.emit('init', JSON.stringify({ accounts /*transfers*/ }));

    Account.watch({ fullDocument: 'updateLookup' }).on('change', async change => {
      if (change.operationType === 'insert') {
        socket.emit('new_account', JSON.stringify(change.fullDocument));
      }

      if (change.operationType === 'update' && String(change.documentKey._id) === id) {
        socket.emit('account_update', JSON.stringify(change.fullDocument));
      }
    });

    // Transfer.watch().on('change', async change => {
    //   if (
    //     change.operationType === 'insert' &&
    //     (String(change.fullDocument.payee) === id || String(change.fullDocument.payer) === id)
    //   ) {
    //     const transfer = await Transfer.findById(change.documentKey._id)
    //       .populate('payee payer', '_id name')
    //       .lean()
    //       .exec();

    //     socket.emit('new_transfer', JSON.stringify(transfer));
    //   }
    // });
  });
}

module.exports = setupIO;
