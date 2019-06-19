const { Account, Transfer } = require('../models');
const { getAccount, getAccounts, getTransfers } = require('../helpers');

function setupIO(io) {
  io.on('connection', async function(socket) {
    const id = socket.handshake.query.id;

    const accounts = await getAccounts(id);
    const transfers = await getTransfers();

    socket.emit('init', JSON.stringify({ accounts, transfers }));

    Account.watch().on('change', async change => {
      if (change.operationType === 'insert') {
        const _accounts = await getAccounts(id);

        socket.emit('new_account', JSON.stringify(_accounts));
      }

      if (change.operationType === 'update') {
        const account = await getAccount(id);

        socket.emit('account_update', JSON.stringify(account));
      }
    });

    Transfer.watch().on('change', async change => {
      if (change.operationType === 'insert') {
        const _transfers = await getTransfers();

        socket.emit('new_transfer', JSON.stringify(_transfers));
      }
    });
  });
}

module.exports = setupIO;
