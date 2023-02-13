const { AuthController } = require("../http/controllers/auth.controller");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { registerValidator, loginValidation } = require("../http/validations/auth.schema");
const router=require("express").Router();

/**
 * @swagger
 *  tags:
 *      name: User-Authentication
 *      description: User-Authentication section
 */
/**
 * @swagger
 *  /auth/register:
 *      post:
 *          tags: [User-Authentication]
 *          summary: Register Users
 *          description: Register users using username, email and mobile
 *          parameters:
 *          -   name: username
 *              description: Pick a unique username
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: password
 *              description: Choose a password with atleast 6 character
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: confirm_password
 *              description: Reapeat password
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: email
 *              description: Enter an email address
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: mobile
 *              description: Enter a phone number
 *              in: formData
 *              required: false
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
router.post("/register",registerValidator(), expressValidatorMapper,AuthController.register);
/**
 * @swagger
 *  /auth/login:
 *      post:
 *          tags: [User-Authentication]
 *          summary: Login
 *          description: Login to userpanel using username and password
 *          parameters:
 *          -   name: username
 *              description: Enter Username
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: password
 *              description: Enter Password
 *              in: formData
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
router.post("/login",loginValidation(), expressValidatorMapper, AuthController.login);
module.exports={
    authRoutes: router
}