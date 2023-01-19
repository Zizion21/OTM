const { UserModel } = require("../../models/user");

class UserController{
    showUserInfo(req, res, next){
        try {
            const user= req.user;
            // const username= user.username;
            return res.status(200).json({
                status: 200,
                success: true,
                userInfo: {
                    "Username" : user.username,
                    "Email": user.email,
                    "Mobile Number": user.mobile,
                    "Role": user.role
                }
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
            // console.log(data);
            const result= await UserModel.updateOne({_id: userID}, {$set: data});
            if(result.modifiedCount> 0){
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "Profile successfuly updated."
                })
            } throw{ status: 400, message: "Update failed. Please try again."}

            
        } catch (error) {
            next(error)
        }

    }
    userTests(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }

    }

}

module.exports={
    UserController: new UserController()
}