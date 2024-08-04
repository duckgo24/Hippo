
const jwtService = require("../services/jwt.service");




const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            jwtService.verify(token, (err, user) => {
                if (err) {
                    return res.status(401).json({ error: 'Token is not valid' });
                }
                req.user = user;
                next();
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const authenMeByToken = async (req, res, next) => {
    try {
        console.log(req.params);
        
        verifyToken (req, res, () => {
            console.log(req.user);
            
            if (req.user?.id == req.params?.id || req.user.role === 'Admin') {
                next();
            } else {
                return res.status(401).json({ error: 'You not permision' });
            }
        });
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    authenMeByToken 
}