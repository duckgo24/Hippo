const express = require('express');
const route = express.Router();
const vnpayService = require('../services/vnpay.service');

/**
 * @swagger
 * tags:
 *   - name: Payment
 */

/**
 * @swagger
 * /payment:
 *   post:
 *     tags: [Payment]
 *     summary: Create a payment request to VNPay
 *     description: Generate a payment URL to redirect users to VNPay's payment gateway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: integer
 *                 description: The payment amount in VND (without decimal, e.g., 100000 for 100,000 VND)
 *               bankCode:
 *                 type: string
 *                 description: The bank code to process the payment (optional)
 *               orderInfo:
 *                 type: string
 *                 description: Information about the order (e.g., product description)
 *               orderType:
 *                 type: string
 *                 description: Type of the order (e.g., 'online' or 'product')
 *               language:
 *                 type: string
 *                 description: Language for the transaction. Defaults to 'vn'
 *     responses:
 *       200:
 *         description: Returns a payment URL to redirect users to VNPay
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?...'
 *       500:
 *         description: Internal server error
 */
route.post('/payment', vnpayService);

module.exports = route;
