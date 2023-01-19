const { UserModel } = require("../../models/user");
const bcrypt= require("bcrypt");
const { checkUserInfo, checkLoginInfo } = require("../validations/auth.schema");
const { hashString, tokenGenerator } = require("../../modules/functions");

class AuthController{
    async register(req, res, next){
        try {
            await checkUserInfo.validateAsync(req.body);
            const {username, password, mobile, email}= req.body;
            const hashed_password= hashString(password);
            const user= await UserModel.create({username, password: hashed_password, email, mobile})
            .catch(err=> {
                if(err?.code ==11000){
                    throw{status:400, message: "User already exists."}
                }
            })
            return res.json(user)
            
        } catch (error) {
            next(error)
        }
    }
    async login(req, res, next){
        try {
            await checkLoginInfo.validateAsync(req.body);
            const {username,password}= req.body;
            const user= await UserModel.findOne({username});
            if(!user) throw{status: 401, message: "Username or password is not correct(username)."};
            const comparePass= bcrypt.compareSync(password, user.password);
            // console.log(comparePass);
            if(!comparePass) throw{status: 401, message: "Username or password is not correct(pass)."};
            const token= tokenGenerator({username});
            user.token= token;
            user.save();
            return res.status(200).json({
                status: 200,
                success: true,
                message: "You Logged into your account successfuly.",
                token
            })
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports={
    AuthController: new AuthController()
}