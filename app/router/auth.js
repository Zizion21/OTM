const { AuthController } = require("../http/controllers/auth.controller");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");

const router=require("express").Router();
router.post("/register", expressValidatorMapper,AuthController.register);
router.post("/login", expressValidatorMapper, AuthController.login);
module.exports={
    authRoutes: router
}