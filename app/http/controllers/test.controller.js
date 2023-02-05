const { TestModel } = require("../../models/test");

class TestContrller {
    async createTest(req, res, next){
        try {
            const owner= req.user._id;
            // console.log(owner);
            const {title, introduction, questions}=req.body;
            const test= await TestModel.create({title, introduction, questions, owner})
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

    async findTest(testID, owner){
        const test= await TestModel.findOne({owner, _id: testID});
        if(!test) throw{status: 404, message: "Test does not exist."};
        
        return test;
    }

    async editTestById(req, res, next){
        try {
            const owner= req.user._id;
            const testID= req.params.id;
            const test= await TestModel.findOne({owner})
            if(!test) throw {status: 404, message: "You cannot access this test to edit."}
            return res.send("OKAY")
            const attendees= test.attendees;
            if(!attendees.length == 0) throw{status:201, message: "Cannot edit a test after it's given."}
            const data= {...req.body};
            // console.log("owner: ",owner);
            // console.log("info: ",test);
            
        } catch (error) {
            next(error)
        }
    }

    async deleteTestById(req, res, next){
        try {
            const owner= req.user._id;
            const testID= req.params.id;
            await this.findTest(testID, owner);
            const deleteTestResult= await TestModel.deleteOne({_id: testID});
            if(deleteTestResult.deletedCount == 0) throw {status: 400, message: "Failed deleting the test. Plase try again."}
            return res.status(200).json({
                status: 200,
                success: true,
                message: "The test deleted successfuly."
            })
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