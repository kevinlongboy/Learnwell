/************************************* IMPORTS *************************************/
// libraries
const express = require('express');
// local files
const { Comment, Subject, User, Video } = require('../../db/models');


/******************************** GLOBAL VARIABLES *********************************/
const router = express.Router();

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
/*************************** /subjects/:subjectId/videos ***************************/
// Get all Videos by a Subjects's ID
// api-routes.md, line 291
router.get('/:subjectId/videos', async(req, res) => {

    let currSubjectId = req.params.subjectId;
    
    /******************** handle errors ********************/                                
    let error = {};
    
    try {
        /******************** catch errors ********************/                                
        let findSubject = await Subject.findByPk(currSubjectId, {raw: true})
        
        // error: missing subject
        if (!findSubject) {
            error.message = "Subject couldn't be found";
            error.statusCode = 404;
            return res.status(404).json(error);
            
            /******************** query db ********************/                                
        } else {
            let findAllSubjectVideos = await Video.findAll({
                where: { subjectId: currSubjectId},
                attributes: {
                    exclude: ["updatedAt"]
                },
                raw: true,
            })
            
        /******************** modify query keys ********************/                                
            for (let i = 0; i < findAllSubjectVideos.length; i++) {
                let video = findAllSubjectVideos[i];
                
                // convert "createdAt" key format
                video.createdAt = convertExactDate(video.createdAt);
                
                // add "numComments" key
                let commentCount = await Comment.count({
                    where: { videoId: video.id},
                    raw: true,
                });

                video.numComments = commentCount

                // add "User" key
                let userInfo = await User.findByPk(video.userId, {raw: true})
                video.User = userInfo;

                // delete impertinent information
                delete video.subjectId
            }

            /******************** return query ********************/
            return res
                .status(200)
                .json({
                    "id": findSubject.id,
                    "name": findSubject.name,
                    "Videos": findAllSubjectVideos
                })
        }

    } catch (err) {
        error.error = err;
        return res.json(error);
    };
})


/************************************ /subjects ************************************/
// Get all Subjects
// api-routes.md, line 262
router.get('/', async(req, res) => {

    let error = {};

    /******************** query db ********************/
    try {
        let getAllSubjects = await Subject.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            raw: true,
        })

    /******************** return query ********************/
        return res
            .status(200)
            .json({
                "Subjects": getAllSubjects
            })

    } catch (err) {
        error.error = err;
        return res.json(error);
    };
});


/********************************* ERROR HANDLER ***********************************/
router.use((err, req, res, next) => {
    return res.json(err)
})


/************************************* EXPORTS *************************************/
module.exports = router;
