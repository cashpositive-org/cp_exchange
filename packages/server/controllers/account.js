const express = require('express');
const { body, cookie, validationResult } = require('express-validator/check');

const logger = require('../utils/logger');
const accountLib = require('../lib/account');

const router = express.Router();

async function createNewAccount(req, res) {
  const validationError = validationResult(req);

  if (!validationError.empty()) {
    return res.status(422).json({ error: validationError.array().join('\n') });
  }

  try {
    const { status, body } = await accountLib.createNewAccount(req.body.name);

    if (status === 200) {
      res.cookie('id', body._id, {
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 100000000),
      });
    }

    res.status(status).json(body);
  } catch (err) {
    const error = 'Failed to create a new account';

    res.status(500).json({
      error,
    });

    logger.error(error, err);
  }
}

async function getAccountDetails(req, res) {
  const validationError = validationResult(req);

  if (!validationError.empty()) {
    return res.status(401).json({ error: validationError.array().join('\n') });
  }

  try {
    const { status, body } = await accountLib.getAccountDetails(req.cookies.accountId);
    res.status(status).json(body);
  } catch (err) {
    const error = 'Failed to fetch the account details';

    res.status(500).json({
      error,
    });

    logger.error(error, err);
  }
}

router.post(
  '/',
  [
    body('name', 'Name should be between 3 to 20 characters long')
      .isString()
      .isLength({ min: 3, max: 20 }),
  ],
  createNewAccount
);
router.get('/', [cookie('id', 'Invalid Account ID').isMongoId()], getAccountDetails);

module.exports = router;
