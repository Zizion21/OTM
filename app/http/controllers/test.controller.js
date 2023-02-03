const { TestModel } = require("../../models/test");

class TestContrller {
    async createTest(req, res, next){
        try {
            const {title, introduction, questions}=req.body;
            const test= await TestModel.create({title, introduction, questions})
            if(!test) throw {status: 201, success: false, message: "Failed to create the test. Please try again."}
            return res.json({
                status:200,
                success: true,
                message: "The test created successfuly."
            })       
        } catch (error) {
            next(error)
            
        }
    }

    async editTest(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }

    async deleteTest(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }

    async showTestResult(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports={
    TestContrller: new TestContrller
}