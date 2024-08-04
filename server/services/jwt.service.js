

class JwtService {
  constructor() {
    this.jwt = require('jsonwebtoken');
    this.secret = process.env.JWT_SECRET_ACCESS_KEY;
  }

  sign(payload, expires) {
    return this.jwt.sign(payload, this.secret, {
      expiresIn: expires
    });
  }

  verify(token, callback) {
    return this.jwt.verify(token, this.secret, callback);
  }
}



module.exports = new JwtService();