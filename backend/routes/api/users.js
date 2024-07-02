/************************************* IMPORTS *************************************/
// libraries
const express = require('express');
const { check } = require('express-validator');
// local files
const { setTokenCookie } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');


/******************************** GLOBAL VARIABLES *********************************/
const router = express.Router();

const validateSignup = [
    check('firstName')
        .isLength({ min: 2 })
        .withMessage('Please enter your your first name.'),
    check('lastName')
        .isLength({ min: 2 })
        .withMessage('Please enter your your last name.'),
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .isLength({ min: 4 })
        .withMessage('Please create a username with 4 or more characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email. Please try again.'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Please use 6 or more characters for your password.'),
    handleValidationErrors
];


/************************************* ROUTES **************************************/
/************************************* /users **************************************/
// Sign Up a User
// api-routes.md, line 169
router.post('/', validateSignup, async (req, res) => {

    const { firstName, lastName, username, password, email } = req.body;
    let avatar = "Default"; // default profile picture for new users
    let error = {};
    // validate signup will run before try-code block; will return rejected promise if errors
    
    try {
        
        /******************** catch errors ********************/                                
        const validationErrorMessages = []

        // error: credentials exist for another user
        let emailExists = await User.findOne({
            where: { email: email },
            raw: true
        });
        if (emailExists) {
            error.message = "User already exists";
            error.statusCode = 403;
            validationErrorMessages.push("Email is taken. Please try another." );
        };

        let usernameExists = await User.findOne({
            where: { username: username },
            raw: true
        });
        if (usernameExists) {
            error.message = "User already exists";
            error.statusCode = 403;
            validationErrorMessages.push("Username is taken. Please try another.");
        };

        // consolidate rejected promise to one response
        // return errors
        if (error.message) {
            error.errors = validationErrorMessages;
            return res.status(403).json(error)
        }

        /******************** query db ********************/                                
        let user = await User.signup({ firstName, lastName, username, password, email, avatar });
        let token = await setTokenCookie(res, user);
        
        /******************** catch errors ********************/                                
        returnUser = await User.findByPk(user.id, {
            raw: true
        })
        returnUser.email = email
        returnUser.username = username
        returnUser.avatar = avatar
        returnUser.token = token
        return res
            .status(200)
            .json(returnUser)

    } catch (err) {
        error.error = err
        return res.json(error);
    }
});


/************************************* EXPORTS *************************************/
module.exports = router;
