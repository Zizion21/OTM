const Joi= require("joi");

const checkUserInfo= Joi.object({
    username: Joi.string().min(4).max(20).pattern(/^[a-z]+[a-z0-9\_\.]{2,}/).error(new Error("Please enter a valid username")),
    password: Joi.string().min(6).error(new Error("Password cannot be less than 6 character.")),
    email: Joi.string().email().error(new Error("Please enter a valid email address.")),
    mobile: Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("Phone number is not valid")),

})

const checkLoginInfo= Joi.object({
    username: Joi.string().min(4).max(20).pattern(/^[a-z]+[a-z0-9\_\.]{2,}/).error(new Error("Please enter a valid username")),
    password: Joi.string().min(6).error(new Error("Password cannot be less than 6 character.")),

})

module.exports={
    checkUserInfo,
    checkLoginInfo
}