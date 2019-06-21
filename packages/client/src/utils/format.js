export const localeFormatAmount = amount =>
  Number(amount).toLocaleString('en-In', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const localeFormatTime = timestamp => new Date(timestamp).toLocaleString();

export const getTransferMessage = (transfer, _id) =>
  `${
    transfer.payee._id === _id
      ? `Received ${localeFormatAmount(transfer.amount.$numberDecimal)} from 
            ${transfer.payer.name}`
      : `Sent ${localeFormatAmount(transfer.amount.$numberDecimal)} to 
            ${transfer.payee.name}`
  }`;
