const { TestModel, QuestionModel } = require("../../models/test");
const { UserModel } = require("../../models/user");
const { urlGenerator } = require("../../modules/functions");

class TestContrller {
    async createTest(req, res, next){
        try {
            const owner= req.user._id;
            const {title, introduction, publics} =req.body;
            const findTest= await TestModel.findOne({title, owner});
            if(findTest) throw{status: 401, message: "This Test already exist. Please choose another title."}
            const url= urlGenerator();
            const test= await TestModel.create({title, introduction, owner, link: url, public: publics})
            const updateUser=await UserModel.updateOne({_id: owner}, {$addToSet: {tests: test._id}})
            if(!test && !updateUser) throw {status: 201, success: false, message: "Failed to create the test. Please try again."}
            return res.json({
                status:200,
                success: true,
                message: "The test created successfuly.",
                URL: `http://localhost:${url}`
            })       
        } catch (error) {
            next(error)
        }
    }

    async addQuestionsToTests(req, res, next){
        try {
            const testID= req.params.id;
            const test= await TestModel.findById(testID);
            if(!test) throw {status: 404, message: "Test does not exist."};
            const {questionText, answerOptions, correctAnswer}= req.body;
            const addQuestionResult= await QuestionModel.create({questionText, answerOptions, correctAnswer, testID});
            const questionID= addQuestionResult._id;
            const updateTestResult= await TestModel.updateOne({_id: testID}, {$addToSet: {questions: questionID}})
            if(!addQuestionResult && !updateTestResult) throw {status:400, message: "Update Failed"}
            return res.json({
                status:200,
                success: true,
                message: "Question added successfuly."
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
            if(test.public== false){
                if(""+test.owner!== ""+ownerID) throw{status: 401, message: "This is a private test."}
            } return res.json(test);
            
        } catch (error) {
            next(error)
        }
    }

    async deleteQuestionsById(req, res, next){
        try {
            const owner= req.user._id;
            const questionID= req.params.id;
            console.log(req.body);
            const question= await TestModel.findById(questionID);
            if(!question) throw{ status: 404, message: "not found"}
            return res.json(question)

        } catch (error) {
            next(error)
        }
        
    }

    async showTestsQuestionsByTestId(req, res, next){
        try {
            const testID= req.params.id;
            const questions= await QuestionModel.find({testID},{"__v":0, "_id": 0, "testID":0});
            if(!questions) throw{status: 404, message: "Test not found."};
            return res.json(questions)
            
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