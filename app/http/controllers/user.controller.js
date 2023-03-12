const { TestModel } = require("../../models/test");
const { UserModel } = require("../../models/user");

class UserController{
    showUserInfo(req, res, next){
        try {
            const user= req.user;
            return res.status(200).json({
                status: 200,
                success: true,
                userInfo: user
            })
        } catch (error) {
            next(error)
        }
    }
    async editProfile(req, res, next){
        try {
            const data= req.body;
            const userID= req.user._id;
            let fields= ["username", "email", "mobile"];
            let badValues= [" ", "", null, undefined, NaN, 0, -1, {}, []];
            Object.entries(data).forEach(([key, value])=>{
                if(!fields.includes(key)) delete data[key]
                if(badValues.includes(value)) delete data[key];
            })
            const username=data.username;
            const usernameCheck= await UserModel.findOne({username});
            if(usernameCheck) throw{status:400, message: "Username already exists."}
            const result= await UserModel.updateOne({_id: userID}, {$set: data});
            if(result.modifiedCount> 0){
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "Profile successfuly updated."
                })
            } throw {status: 400, message: "Update failed. Please try again."}
        } catch (error) {
            next(error)
        }
    }
    async userTests(req, res, next){
        try {
            const owner= req.user._id;
            const test= await TestModel.find({owner})
            if(!test) throw{status: 201, message: "You have no test yet."}
            return res.json(test)
        } catch (error) {
            next(error)
        }
    }
}
module.exports={
    UserController: new UserController()
}