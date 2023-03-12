// const Joi= require("joi");
const { UserModel } = require("../../models/user");
const {body}= require("express-validator")
function registerValidator(){
    return [
        body("username").custom(async(value, ctx)=> {
            if(value){
                const usernameRegex= /^[a-z]+[a-z0-9\_\.]{2,}/gi
                if(usernameRegex.test(value)){
                    const user= await UserModel.findOne({username: value});
                    if(user) throw "Username already exists.";
                    return true;
                } throw "Please enter a valid Username.";

            } throw "Please enter a username.";
        }),
        body("email").isEmail().withMessage("Enter a valid email address.")
        .custom(async email=>{
            const user= await UserModel.findOne({email});
            if(user) throw "Email already exists.";
            return true;
        }),
        body("mobile").isMobilePhone("fa-IR").withMessage("Enter a valid phone number")
        .custom(async mobile=>{
            const user= await UserModel.findOne({mobile});
            if(user) throw "Phone number already exists.";
            return true;
        }),
        body("password").isLength({min: 6}).withMessage("Enter a password with at least 6 character")
        .custom((value, ctx)=>{
            if(!value) throw "Enter a password.";
            if(value !== ctx?.req?.body?.confirm_password) throw "Password and confirm do not match.";
            return true
        })
    ]
}

function loginValidation(){
    return [
        body("username").notEmpty().withMessage("Enter a username.")
        .custom(username=>{
            const usernameRegex= /^[a-z]+[a-z0-9\_\.]{2,}/gi
            if(usernameRegex.test(username)){
                return true;
            } throw "Enter a valid username."
        }),
        body("password").isLength({min: 6, max: 16}).withMessage("Username or password is wrong.")
    ]
}

module.exports={
    registerValidator,
    loginValidation
}