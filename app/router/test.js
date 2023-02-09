const { TestContrller } = require("../http/controllers/test.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");

const router=require("express").Router();

router.get("/showResults",checkLogin, TestContrller.showTestResult);
router.post("/create",checkLogin, TestContrller.createTest);
router.post("/edit/:id",checkLogin, TestContrller.editTestById);
router.post("/delete/:id",checkLogin, TestContrller.deleteTestById);
router.get("/:id", checkLogin, TestContrller.showATestById);

module.exports={
    testRoutes: router
}