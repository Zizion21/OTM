const { authRoutes } = require("./auth");
const { testRoutes } = require("./test");
const { userRoutes } = require("./user");

const router= require("express").Router();
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/test", testRoutes);
module.exports={
    AllRoutes: router
}