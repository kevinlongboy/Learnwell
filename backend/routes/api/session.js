/************************************* IMPORTS *************************************/
// libraries
const express = require('express')
const { check } = require('express-validator');
// local files
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');


/******************************** GLOBAL VARIABLES *********************************/
const router = express.Router();

const validateLogin = [
    check('credential')
        // .exists({ checkFalsy: true })
        .isLength({ min: 3 })
        .withMessage('Please enter your username or email.'),
    check('password')
        // .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Please enter your password.'),
    handleValidationErrors
];


/************************************* ROUTES **************************************/
/************************************ /session *************************************/
// Sign Up a User
// api-routes.md, line 169
router.post('/', validateLogin, async (req, res, next) => {

    const { credential, password } = req.body;
    let error = {};

    try {
        const user = await User.login({ credential, password });

        /******************** catch errors ********************/
        // error: invalid credentials
        if (!user) {
            error.message = "Invalid credentials. Please try again."
            error.statusCode = 401;
            return res.status(401).json(error); // chain status to return-response
        }

        const token = await setTokenCookie(res, user);

        const printUser = user.toJSON();
        printUser.token = token;

        /******************** return query ********************/
        return res.json(printUser)

    } catch (err) {
        error.error = err;
        return res.json(error);
    }
});


// Log Out
router.delete('/', (_req, res) => {

    /******************** query db ********************/
    res.clearCookie('token');
        
    /******************** return query ********************/
    return res.json({ message: 'success' });
});


// Get the Current User
// api-routes.md, line 76
router.get('/', restoreUser, (req, res) => {

    const { user } = req;
    let error = {};

    try {
    
        /******************** query db ********************/
        if (user) {
            let printUser = {};
            printUser.id = user.id;
            printUser.firstName = user.firstName;
            printUser.lastName = user.lastName;
            printUser.email = user.email;
            printUser.username = user.username;
            printUser.avatar = user.avatar;

            /******************** return query ********************/
            return res
                .status(200)
                .json(printUser)

        } else return res.json({});

    } catch (err) {
        error.err = err;
        res.json(error)
    }
});


/************************************* EXPORTS *************************************/
module.exports = router;
