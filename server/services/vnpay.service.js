const querystring = require('qs');
const moment = require('moment');
const crypto = require("crypto");

module.exports = function vnpayService(req, res) {
    const ipAddr = getClientIp(req) || '127.0.0.1'; 
    const tmnCode = 'HXQYMHU8';
    const secretKey = 'TGJ1CSHRLHJN715W7C717B06VJUXI93N';
    const vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    const returnUrl = 'http://localhost:3000/';

    const date = moment();
    const createDate = date.format('YYYYMMDDHHmmss');
    const orderId = date.format('HHmmss');

    const { amount, bankCode, orderInfo, orderType } = req.body;
    const locale = req.body.language || 'vn';
    const currCode = 'VND';

    // Initialize parameters
    const vnp_Params = {
        'vnp_Version': '2.1.0',
        'vnp_Command': 'pay',
        'vnp_TmnCode': tmnCode,
        'vnp_Locale': locale,
        'vnp_CurrCode': currCode,
        'vnp_TxnRef': orderId,
        'vnp_OrderInfo': orderInfo,
        'vnp_OrderType': orderType,
        'vnp_Amount': amount * 100,
        'vnp_ReturnUrl': returnUrl,
        'vnp_IpAddr': ipAddr,
        'vnp_CreateDate': createDate
    };

    if (bankCode) {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    // Sort parameters
    const sortedParams = sortObject(vnp_Params);

    // Create the string to sign
    const signData = querystring.stringify(sortedParams, { encode: false });
    
    // Create HMAC SHA512 hash
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
    
    // Add secure hash to parameters
    sortedParams['vnp_SecureHash'] = signed;

    // Create the payment URL
    const paymentUrl = vnpUrl + '?' + querystring.stringify(sortedParams, { encode: true });

    console.log(paymentUrl);

    res.json(paymentUrl);
};

function sortObject(obj) {
    const keys = Object.keys(obj).sort();
    const newObj = {};
    keys.forEach(key => {
        newObj[key] = obj[key];
    });
    return newObj;
}

function getClientIp(req) {
    return req.headers['x-forwarded-for'] || 
           req.connection.remoteAddress || 
           req.socket.remoteAddress || 
           (req.connection.socket ? req.connection.socket.remoteAddress : null);
}
