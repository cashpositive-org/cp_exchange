const mongoose = require('mongoose');

const { Schema } = mongoose;

const accountSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 20,
    },
    balance: {
      type: Schema.Types.Decimal128,
      default: 50,
      min: 0,
    },
  },
  {
    timestamps: true,
    usePushEach: true,
  }
);

module.exports = accountSchema;
