const { TestContrller } = require("../http/controllers/test.controller");

const router=require("express").Router();

router.get("/showResults");
router.post("/create", TestContrller.createTest);
router.post("/edit");
router.post("/delete");

module.exports={
    testRoutes: router
}