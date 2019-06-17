const mongoose = require('mongoose');

const { Schema } = mongoose;

const testSchema = new Schema(
  {
    message: String,
  },
  {
    timestamps: true,
    usePushEach: true,
  }
);

module.exports = testSchema;
