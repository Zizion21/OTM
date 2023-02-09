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

    async editTestById(req, res, next){
        try {
            const owner= req.user._id;
            const testID= req.params.id;
            const test= await TestModel.findOne({owner, _id: testID})
            if(!test) throw {status: 404, message: "You cannot access this test to edit."}
            if(test.attendees.length !== 0) throw{status:201, message: "Cannot edit a test after it's given."}

            const data= {...req.body};
            Object.entries(data).forEach(([key, value])=>{
                if(!["title", "introduction", "public"].includes(key)) delete data[key];
                if(["", " ", 0, null, undefined, NaN].includes(value)) delete data[key];
            })

            const updateResult= await TestModel.updateOne({_id: testID}, {$set: data});
            if(updateResult.modifiedCount == 0) throw {status: 400, message: "Update failed. Please try again."};
            return res.status(200).json({
                status: 200,
                success: true,
                message:"The test updated successfuly."
            })
            
        } catch (error) {
            next(error)
        }
    }

    async deleteTestById(req, res, next){
        try {
            const owner= req.user._id;
            const testID= req.params.id;
            const test= await TestModel.findOne({owner, _id: testID})
            if(!test) throw {status: 404, message: "You cannot access this test to edit."}            
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

    async showATestById(req, res, next){
        try {
            const ownerID= req.user._id;
            const testID= req.params.id;
            const test= await TestModel.findById(testID);
            if(!test) throw{status: 404, message: "Test not found."}
            // console.log(""+ownerID);
            // console.log(""+test.owner);
            if(test.public== false){
                if(""+test.owner!== ""+ownerID) throw{status: 401, message: "This is a private test."}
            } return res.json(test);
            
        } catch (error) {
            next(error)
        }
    }

    async deleteQuestionsById(req, res, next){
        
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