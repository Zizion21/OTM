const { UserController } = require("../http/controllers/user.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");

const router= require("express").Router();
/**
 * @swagger
 *  tags:
 *      name: User-Profile
 *      description: User-Profile section
 */
/**
 * @swagger
 *  /user/profile:
 *      get:
 *          tags: [User-Profile]
 *          summary: User Profile
 *          description: User Information
 *          parameters:
 *              -   in: header
 *                  name: Authorization
 *                  example: Bearer your-token...
 *          responses:
 *              200:
 *                  description: success
 *              404: 
 *                  description: not found
 */
router.get("/profile",checkLogin, UserController.showUserInfo);
/**
 * @swagger
 *  /user/tests:
 *      get:
 *          tags: [User-Profile]
 *          summary: User's Tests
 *          description: Tests which user created.
 *          parameters:
 *              -   in: header
 *                  name: Authorization
 *          responses:
 *              200:
 *                  description: success
 *              404: 
 *                  description: not found
 */
router.get("/tests",checkLogin, UserController.userTests);
/**
 * @swagger
 *  /user/editProfile:
 *      post:
 *          tags: [User-Profile]
 *          summary: Edit Profile
 *          description: User can edit username, email and mobile
 *          parameters:
 *          -   name: Authorization
 *              in: header
 *          -   name: username
 *              description: Pick a unique username.
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: email
 *              description: Enter your new email address.
 *              in: formData
 *              required: false
 *              type: string
 *          -   name: mobile
 *              description: fa-IRI phone number
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
router.post("/editProfile",checkLogin, UserController.editProfile);

module.exports={
    userRoutes: router
}