const { TestContrller } = require("../http/controllers/test.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");

const router=require("express").Router();

router.get("/showResults",checkLogin, TestContrller.showTestResult);
router.post("/create",checkLogin, TestContrller.createTest);
router.post("/edit/:id",checkLogin, TestContrller.editTestById);
router.put("/create/:id/questions",checkLogin, TestContrller.addQuestionsToTests);
router.delete("/delete/:id",checkLogin, TestContrller.deleteTestById);
router.delete("/deleteQuestions/:id",checkLogin, TestContrller.deleteQuestionsById);
router.get("/:id", checkLogin, TestContrller.showATestById);

module.exports={
    testRoutes: router
}