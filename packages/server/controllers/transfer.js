// const express = require('express');
// const { body, cookie, validationResult } = require('express-validator/check');

// const logger = require('../utils/logger');
// const transferLib = require('../lib/transfer');

// const router = express.Router();

// async function executeTransfer(req, res) {
//   const validationError = validationResult(req);

//   if (!validationError.isEmpty()) {
//     return res.status(422).json({
//       error: validationError.array(),
//     });
//   }

//   try {
//     const { payee, amount } = req.body;
//     const payer = req.cookies.id;

//     const { status, body } = await transferLib.executeTransfer({ payer, payee, amount });
//     res.status(status).json(body);
//   } catch (err) {
//     const error = 'Failed to transact the amount';

//     res.status(500).json({
//       error,
//     });

//     logger.error(error, err);
//   }
// }

// router.post(
//   '/',
//   [
//     cookie('id', 'Invalid Payer ID').isMongoId(),
//     body('payee', 'Invalid Payee ID').isMongoId(),
//     body('amount', 'Invalid Amount').custom(value => ['10', '20', '30'].includes(value)),
//   ],
//   executeTransfer
// );

// module.exports = router;
