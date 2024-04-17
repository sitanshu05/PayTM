const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware = (req,res,next) =>{
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authorization.split(' ')[1];

    try{
        const decoded = jwt.verify(token,JWT_SECRET)

        req.userId = decoded.userId;
        next()
    }catch(err){
        res.status(403).json({});
    }
}

module.exports = {authMiddleware}