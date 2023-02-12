const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
const nanoid= require("nanoid");


function hashString(str){
    const salt= bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt)
}

function tokenGenerator(payload){
    const token= jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "365 days"})
    return token
}

function verifyJwtToken(token){
    const result= jwt.verify(token, process.env.SECRET_KEY);
    if(!result?.username) throw{status: 401, message: "Please log into your account. (jwtTokenVer)"};
    return result;

}

function urlGenerator(){
    const url= nanoid();
    return url;
}

module.exports={
    hashString,
    tokenGenerator,
    verifyJwtToken,
    urlGenerator
}