
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
    let acc_id;
    
    

    if (req.body && req.body.acc_id) {
        acc_id = req.body.acc_id;
    } else if (req.params && req.params.acc_id) {
        acc_id = req.params.acc_id;
    } else if (req.query && req.query.acc_id) {
        acc_id = req.query.acc_id;
    }
    console.log(acc_id);
    


    try {
        verifyToken(req, res, () => {

            if (req.user?.id == acc_id) {
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