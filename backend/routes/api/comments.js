/************************************* IMPORTS *************************************/
// libraries
const express = require('express');
const router = express.Router();
// local files
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { Comment } = require('../../db/models');


/******************************** GLOBAL VARIABLES *********************************/
const validateComment = [
    check('comment')
        .exists({ checkFalsy: true })
        .withMessage("Comment text is required"),
];

function convertExactDate(iso) { // Output: "January 1, 2024"

    let year = iso.slice(0, 4);
    let month = parseInt(iso.slice(5, 7));
    let day = iso.slice(8, 10);

    if (month === 1) {
        month = 'January'
    } else if (month === 2) {
        month = 'February'
    } else if (month === 3) {
        month = 'March'
    } else if (month === 4) {
        month = 'April'
    } else if (month === 5) {
        month = 'May'
    } else if (month === 6) {
        month = 'June'
    } else if (month === 7) {
        month = 'July'
    } else if (month === 8) {
        month = 'August'
    } else if (month === 9) {
        month = 'September'
    } else if (month === 10) {
        month = 'October'
    } else if (month === 11) {
        month = 'November'
    } else if (month === 12) {
        month = 'December'
    }

    if (day.length === 2 && day[0] === '0') {
        day = day[1]
    }

    return `${month} ${day}, ${year}`
}


/************************************* ROUTES **************************************/
/****************************** /comments/:commentId *******************************/
// Edit a Comment
// api-routes.md, line 768
router.put('/:commentId', requireAuth, async (req, res) => {

    let commentId = parseInt(req.params.commentId);
    let error = {};

    try {
        let { comment } = req.body;
        let putComment = await Comment.findByPk(commentId);

        /******************** catch errors ********************/
        const validationErrorMessages = []

        // error: missing comment
        if (!putComment) {
            error.message = "Comment couldn't be found";
            error.statusCode = 404;
            validationErrorMessages.push("Comment couldn't be found");
            return res.status(404).json(error);
        }

        // error: missing fields
        if (!comment) {
            error.message = "Validation Error";
            error.status = 422;
            validationErrorMessages.push("Comment is required.")
            return res.status(422).json(error);
        }

        /******************** update db ********************/
        if (comment) await putComment.update({ comment: comment });
        await putComment.save();

        /******************** return query ********************/
        return res
            .status(200)
            .json(putComment)

    } catch (err) {
        error.error = err
        return res.json(error);
    }
});

// Delete a Comment
// api-routes.md, line 832
router.delete('/:commentId', requireAuth, async (req, res) => {

    let commentId = req.params.commentId;
    let error = {};

    try {
        let deleteComment = await Comment.findByPk(commentId, {raw: true});
        
        /******************** catch errors ********************/
        // error: missing comment
        if (!deleteComment) {
            error.message = "Comment couldn't be found";
            error.status = 404;
            return res.json(error);
        }
        
        /******************** update db ********************/
        deleteComment.destroy();
        deleteComment.save();

        /******************** return query ********************/
        return res
            .status(200)
            .json({
                "message": "Successfully deleted",
                "statusCode": 200
            })

    } catch (err) {
        error.error = err
        return res.json(error);
    }
});


/********************************* ERROR HANDLER ***********************************/
router.use((err, req, res, next) => {
    return res.json(err)
})


/************************************* EXPORTS *************************************/
module.exports = router;
