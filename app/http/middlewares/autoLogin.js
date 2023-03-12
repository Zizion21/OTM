const { UserModel } = require("../../models/user");
const { verifyJwtToken } = require("../../modules/functions");

const checkLogin= async(req, res, next)=>{
    try {
        const authorization= req?.headers?.authorization;
        if(!authorization) throw {status: 401, message: "Please log into your account. (auth)"}
        let token= authorization;
        if(!token) throw {status: 401, message: "Please log into your account. (token)"};
        const result= verifyJwtToken(token);
        const {username}= result;
        const user= await UserModel.findOne({username}, {password: 0});
        if(!user) throw{status: 401, message: "Please log into your account."};
        req.user= user;
        next()
        
    } catch (error) {
        next(error)
    }
}

module.exports={
    checkLogin
}