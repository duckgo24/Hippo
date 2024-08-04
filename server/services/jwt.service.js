

class JwtService {
  constructor() {
    this.jwt = require('jsonwebtoken');
    this.secret = process.env.JWT_SECRET;
  }

  sign(payload) {
    return this.jwt.sign(payload, this.secret);
  }

  verify(token, callback) {
    return this.jwt.verify(token, this.secret, callback);
  }
}



module.exports = new JwtService();