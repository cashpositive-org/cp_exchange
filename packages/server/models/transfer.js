const mongoose = require('mongoose');

const { Schema } = mongoose;

const transferSchema = new Schema(
  {
    payee: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
    },
    payer: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
    },
    amount: {
      type: Schema.Types.Decimal128,
      min: 0,
      get: value => value.toString(),
    },
  },
  {
    timestamps: true,
    usePushEach: true,
  }
);

module.exports = transferSchema;
