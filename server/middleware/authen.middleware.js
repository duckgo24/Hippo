
const jwtService = require("../services/jwt.service");


const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            return res.status(401).json({ error: 'Not Authorzited' });
        }
        if (token) {
            jwtService.verify(token, (err, user) => {
                if (err) {
                    return res.status(401).json({ error: 'Token is not valid' });
                }
                if (user) {
                    next();
                }
            });
        }
    } catch (error) {
        return res.status(403).json({ error: error.message });
    }
};


module.exports = {
    verifyToken
}