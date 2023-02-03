const mongoose= require("mongoose");
const UserSchema= new mongoose.Schema({
    username: {type: String, required: true, lowercase: true, uniqe: true},
    password:{type: String, required: true},
    email:{type: String, lowercase: true},
    mobile: {type: String, uniqe: true},
    role: {type: [String], default: ["USER"]},
    profile_image: {type: String},
    token: {type: String, default: ""},
    tests: {type: [String], default: []}
},{
    timestamps: true
})

module.exports={
    UserModel: mongoose.model("user", UserSchema)
}