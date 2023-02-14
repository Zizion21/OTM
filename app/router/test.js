const { TestContrller } = require("../http/controllers/test.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");

const router=require("express").Router();
/**
 * @swagger
 *  tags:
 *      name: Tests
 *      description: Tests section
 */

router.get("/showResults",checkLogin, TestContrller.showTestResult);
/**
 * @swagger
 *  /test/create:
 *      post:
 *          tags: [Tests]
 *          summary: Create a test
 *          description: Add test's title, description and privacy option.
 *          parameters:
 *          -   name: Authorization
 *              in: header
 *          -   name: title
 *              description: Pick a unique title for the test you want to create.
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: introduction
 *              description: Explain how the test goes.
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: public
 *              description: Is this a public test or a private one?
 *              in: formData
 *              required: false
 *              type: boolean
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorization
 *              500:
 *                  description: Internal Server Error
 */
router.post("/create",checkLogin, TestContrller.createTest);
/**
 * @swagger
 *  /test/edit/{id}:
 *      post:
 *          tags: [Tests]
 *          summary: Edit a test
 *          description: Edit a test by ID.
 *          parameters:
 *          -   name: Authorization
 *              in: header
 *          -   name: id
 *              description: TestID.
 *              in: path
 *              required: true
 *              type: string
 *          -   name: title
 *              description: Enter a new title for the test.
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: introduction
 *              description: Explain how the test goes.
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: public
 *              description: Is this a public test or a private one?
 *              in: formData
 *              required: false
 *              type: boolean
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorization
 *              500:
 *                  description: Internal Server Error
 */
router.post("/edit/:id",checkLogin, TestContrller.editTestById);
/**
 * @swagger
 *  /test/create/{id}/questions:
 *      put:
 *          tags: [Tests]
 *          summary: Questions
 *          description: Add questions to your test.
 *          parameters:
 *          -   name: Authorization
 *              in: header
 *          -   name: id
 *              description: TestID.
 *              in: path
 *              required: true
 *              type: string
 *          -   name: questionText
 *              description: Enter question text.
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: correctAnswer
 *              description: Enter correct answer.
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: answerOptions
 *              description: Enter other choices.
 *              in: formData
 *              required: false
 *              type: array
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorization
 *              500:
 *                  description: Internal Server Error
 */
router.put("/create/:id/questions",checkLogin, TestContrller.addQuestionsToTests);
/**
 * @swagger
 *  /test/delete/{id}:
 *      delete:
 *          tags: [Tests]
 *          summary: Delete a test
 *          description: Delete a test by ID.
 *          parameters:
 *          -   name: Authorization
 *              in: header
 *          -   name: id
 *              description: TestID.
 *              in: path
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorization
 *              500:
 *                  description: Internal Server Error
 */
router.delete("/delete/:id",checkLogin, TestContrller.deleteTestById);
/**
 * @swagger
 *  /test/deleteQuestions/{id}:
 *      delete:
 *          tags: [Tests]
 *          summary: Delete a Question
 *          description: Delete a question by ID.
 *          parameters:
 *          -   name: Authorization
 *              in: header
 *          -   name: id
 *              description: QuestionID.
 *              in: path
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorization
 *              500:
 *                  description: Internal Server Error
 */
router.delete("/deleteQuestions/:id",checkLogin, TestContrller.deleteQuestionsById);
/**
 * @swagger
 *  /test/questions/{id}:
 *      get:
 *          tags: [Tests]
 *          summary: A test's questions
 *          description: Shows a test's questions by the testID.
 *          parameters:
 *              -   in: header
 *                  name: Authorization
 *              -   in: path
 *                  name: id
 *                  description: TestID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *              404: 
 *                  description: not found
 */
router.get("/questions/:id", checkLogin, TestContrller.showTestsQuestionsByTestId);
/**
 * @swagger
 *  /test/{id}:
 *      get:
 *          tags: [Tests]
 *          summary: Test Detail
 *          description: shows a test detail by testID
 *          parameters:
 *              -   in: header
 *                  name: Authorization
 *              -   in: path
 *                  name: id
 *          responses:
 *              200:
 *                  description: success
 *              404: 
 *                  description: not found
 */
router.get("/:id", checkLogin, TestContrller.showATestById);

module.exports={
    testRoutes: router
}