const express = require('express');
const { body, cookie, validationResult } = require('express-validator/check');

const logger = require('../utils/logger');
const transferLib = require('../lib/transfer');

const router = express.Router();

async function executeTransfer(req, res) {
  const validationError = validationResult(req);

  if (!validationError.empty()) {
    return res.status(422).json({ error: validationError.array().join('\n') });
  }

  try {
    const { payee, amount } = req.body;
    const payer = req.cookies.id;

    const { status, body } = await transferLib.executeTransfer({ payer, payee, amount });
    res.status(status).json(body);
  } catch (err) {
    const error = 'Failed to transact the amount';

    res.status(500).json({
      error,
    });

    logger.error(error, err);
  }
}

router.post(
  '/',
  [
    cookie('id', 'Invalid Payer ID').isMongoId(),
    body('payee', 'Invalid Payee ID').isMongoId(),
    body('amount', 'Invalid Amount').isCurrency({ symbol: '', digits_after_decimal: [1, 2] }),
  ],
  executeTransfer
);
