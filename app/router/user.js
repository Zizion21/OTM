const { UserController } = require("../http/controllers/user.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");

const router= require("express").Router();
router.get("/profile",checkLogin, UserController.showUserInfo);
router.get("/tests",checkLogin, UserController.userTests);
router.post("/editProfile",checkLogin, UserController.editProfile);

module.exports={
    userRoutes: router
}