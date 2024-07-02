/************************************* IMPORTS *************************************/
// libraries
const express = require('express');
const router = express.Router();
// local files
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Comment, Subject, User, Video } = require('../../db/models');


/******************************** GLOBAL VARIABLES *********************************/
const validateVideo = [
    check('title')
        .isLength({ min: 1 })
        .withMessage("Video title is required"),
    check('url')
        .isLength({ min: 1 })
        .withMessage("Video URL is required"),
    check('subjectId')
        .isLength({ min: 1 })
        .withMessage("Video subject is required"),
    check('description')
        .isLength({ min: 1 })
        .withMessage("Video description is required"),
    check('description')
        .isLength({ max: 1000 })
        .withMessage("Please write a shorter description"),
    handleValidationErrors
    ];

const validateComment = [
    check('comment')
        .isLength({ min: 0 })
        .withMessage("Comment is required"),
    check('comment')
        .isLength({ max: 500 })
        .withMessage("Please write a shorter comment"),
    handleValidationErrors
]

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
/**************************** /videos/:videoId/comments ****************************/
// Get all Comments by a Video's ID
// api-routes.md, line 654
router.get('/:videoId/comments', async (req, res) => {

    let currVideoId = req.params.videoId;
    let error = {};

    try {
        /******************** catch errors ********************/                                
        let findVideo = await Video.findByPk(currVideoId, {raw: true});
        
        // error: missing video
        if (!findVideo) {
            error.message = "Video couldn't be found"
            error.statusCode = 404
            return res.json(error)
            
        /******************** query db ********************/                                
        } else {
            let findAllVideoComments = await Comment.findAll({
                where: { videoId: currVideoId },
                order: [['createdAt', 'ASC']],
                raw: true,
            })

            /******************** modify query keys ********************/      
            for (let i = 0; i < findAllVideoComments.length; i++) {
                let currComment = findAllVideoComments[i];

                // add "User" key
                let currentUserId = currComment.userId;

                let currentUserData = await User.findByPk(currentUserId, {
                    attributes: {
                        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
                    },
                    raw: true,
                })

                currComment.User = currentUserData

                // convert "createdAt" key format
                currComment.createdAt = convertExactDate(currComment.createdAt);
            }

            /******************** return query ********************/
            return res
                .status(200)
                .json({
                    "Comments": findAllVideoComments
                })
        }

    } catch (err) {
        error.error = err
        return res.json(error);
    }
});

// Create a Comment for a Video based on the Video's ID
// api-routes.md, line 702
router.post('/:videoId/comments', requireAuth, validateComment, async (req, res) => {

    let currentUser = req.user;
    let currentUserId = req.user.id;
    let postVideoId = req.params.videoId;
    let error = {};
    
    try {
        let { comment } = req.body;

        /******************** catch errors ********************/                                
        const validationErrorMessages = []

        // error: missing video
        let findVideo = await Video.findByPk(postVideoId, {raw: true});
        if (!findVideo) {
            error.message = "Video couldn't be found";
            error.statusCode = 404;
            validationErrorMessages.push("Video couldn't be found");
            error.errors = validationErrorMessages;
            return res.status(404).json(error)
        }

        // error: missing fields
        if (!comment) {
            error.message = "Validation Error";
            error.statusCode = 400;
            validationErrorMessages.push("Comment is required.")
            error.errors = validationErrorMessages;
        }

        // return any errors
        if (error.message) {
            error.errors = validationErrorMessages;
            return res.status(400).json(error)
        }

        /******************** query db ********************/                                
        let postVideoComment = await currentUser.createComment({
            userId: currentUserId,
            videoId: parseInt(postVideoId),
            comment: comment,
        })
        postVideoComment.save();
        
        /******************** return query ********************/                                
        return res
            .status(201)
            .json(postVideoComment)

    } catch (err) {
        error.error = err
        return res.json(error);
    }
});


/******************************** /videos/current **********************************/
// Get all Videos of the current User
// api-routes.md, line 391
router.get('/current', requireAuth, async (req, res, next) => {

    let currentUserId = req.user.id;
    let error = {};

    try {
        /******************** query db ********************/
        let getCurrentVideos = await Video.findAll({
            where: { userId: currentUserId },
            raw: true,
        });
        
        /******************** modify keys ********************/
        for (let i = 0; i < getCurrentVideos.length; i++) {
            
            let currVideo = getCurrentVideos[i]

            // convert "createdAt" key format
            currVideo.createdAt = convertExactDate(currVideo.createdAt);
            
            // add "numComments" key
            let commentCount = await Comment.count({
                where: { videoId: currVideo.id},
                raw: true,
            });

            currVideo.numComments = commentCount

            // add "Subject" key
            let subjectInfo = await Subject.findByPk(currVideo.subjectId, {
                attributes: {
                    include: ["id", "name", "avatar"],
                    exclude: ["createdAt", "updatedAt"]
                },
                raw: true,
            });
            currVideo.Subject = subjectInfo;


            // add "User" key
            let currentUserData = await User.findByPk(currentUserId, {
                attributes: {
                    exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
                },
                raw: true,
            });
            currVideo.User = currentUserData;
        }

        /******************** return query ********************/
        return res
            .status(200)
            .json({
                "Videos": getCurrentVideos
            })

    } catch (err) {
        error.message = "Video couldn't be found"
        error.status = 404
        return res
            .json(error);
    }
});


/******************************** /videos/:videoId *********************************/
// Get details of a Video from an ID
// api-routes.md, line 431
router.get('/:videoId', async (req, res, next) => {

    let currentVideoId = req.params.videoId;

    let error = {};
    
    try {
        
        /******************** query db ********************/                                
        let getVideo = await Video.findByPk(currentVideoId, {raw: true})
        
        if (!getVideo) {
            error.message = "Video couldn't be found";
            error.statusCode = 404;
            return res.json(error)
        }

        /******************** modify query keys ********************/        
        // convert "createdAt" key format
        getVideo.createdAt = convertExactDate(getVideo.createdAt);
        
        // add "numComments" key
        let commentCount = await Comment.count({
            where: { videoId: getVideo.id},
            raw: true,
        });
        commentCount ? getVideo.numComments = commentCount : 0;
        
        // add "Subject" key
        let subjectInfo = await Subject.findByPk(getVideo.subjectId, {
            attributes: {
                include: ["id", "name", "avatar"],
                exclude: ["createdAt", "updatedAt"]
            },
            raw: true,
        });
        getVideo.Subject = subjectInfo
        
        // add "User" key
        let userInfo = await User.findByPk(getVideo.userId, {
            attributes: {
                include: ["firstName", "lastName", "userName", "avatar"],
                exclude: ["email", "hashedPassword", "createdAt", "updatedAt"]
            },
            raw: true,
        });
        getVideo.User = userInfo
        
        /******************** return query ********************/                                
        return res
            .status(200)
            .json(getVideo)

    } catch (err) {
        error.error = err
        return res.json(error);
    }
});

// Update a Video
// api-routes.md, line 547
router.put('/:videoId', requireAuth, async (req, res, next) => {

    let videoId = req.params.videoId;
    let currentUserId = req.user.id
    let error = {};
    
    try {
        /******************** query db ********************/                                
        let putVideo = await Video.findByPk(parseInt(videoId)); // cannot be "raw: true" when updating
        let { title, url, subjectId, description  } = req.body;

        /******************** catch errors ********************/                                
        const validationErrorMessages = []

        // error: missing video
        if (!putVideo) {
            error.message = "Video couldn't be found";
            error.statusCode = 404;
            validationErrorMessages.push("Video couldn't be found");
            error.errors = validationErrorMessages;
            return res.status(404).json(error);
        }

        // error: missing fields
        if (!title) {
            error.message = "Validation Error";
            error.status = 422;
            validationErrorMessages.push("Title is required")
        }
        if (!url) {
            error.message = "Validation Error";
            error.status = 422;
            validationErrorMessages.push("URL is required.")
        }
        if (!subjectId) {
            error.message = "Validation Error";
            error.status = 422;
            validationErrorMessages.push("Subject is required")
        }
        if (!description) {
            error.message = "Validation Error";
            error.status = 422;
            validationErrorMessages.push("Description is required")
        }
        
        if (error.message) {
            error.errors = validationErrorMessages;
            return res.status(422).json(error)
        }
        
        /******************** update db ********************/                                
        if (title) await putVideo.set({ title: title });
        if (url) await putVideo.set({ url: url });
        if (subjectId) await putVideo.set({ subjectId: parseInt(subjectId)});
        if (description) await putVideo.set({ description: description });
        await putVideo.save();
    
        /******************** modify keys ********************/
        let getUpdatedVideo = await Video.findByPk(putVideo.id, {raw: true})
        
        // Add "User" key
        let userData = await User.findByPk(currentUserId, { raw: true});
        getUpdatedVideo.User = userData;
        
        // Add "Subject" key
        let subjectData = await Subject.findByPk(putVideo.subjectId, { raw: true});
        getUpdatedVideo.Subject = subjectData;
        
        /******************** return query ********************/
        return res
            .status(200)
            .json(getUpdatedVideo)

    } catch (err) {
        console.log(err)
        error.error = err
        return res.json(error);
    }
});

// Delete a Video
// api-routes.md, line 620
router.delete('/:videoId', requireAuth, async (req, res, next) => {

    let videoId = req.params.videoId;
    let error = {};

    try {
        /******************** query db ********************/
        let deleteVideo = await Video.findByPk(parseInt(videoId));

        /******************** catch errors ********************/
        if (!deleteVideo) {
            error.message = "Video couldn't be found";
            error.status = 404;
            return res.status(404).json(error);
        }

        /******************** update db ********************/
        deleteVideo.destroy();
        deleteVideo.save();
        
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


/************************************* /videos *************************************/
// Get all Videos
// api-routes.md, line 344
router.get('/', async (req, res, next) => {

    let error = {};

    try {
        
        /******************** query db ********************/
        let getVideos = await Video.findAll({                
            order: [['createdAt', 'DESC']],
            raw: true
        });

        /******************** modify query keys ********************/
        for (let i = 0; i < getVideos.length; i++) {
            let currVideo = getVideos[i];

            // convert "createdAt" key format
            currVideo.createdAt = convertExactDate(currVideo.createdAt);
            
            // add "Subject" key
            let subjectInfo = await Subject.findByPk(currVideo.subjectId, {
                attributes: {
                    include: ["id", "name", "avatar"],
                    exclude: ["createdAt", "updatedAt"]
                },
                raw: true,
            });
            currVideo.Subject = subjectInfo;

            // add "User" key
            let userInfo = await User.findByPk(currVideo.userId, {
                attributes: {
                    include: ["id", "firstName", "lastName", "userName", "avatar"],
                    exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
                },
                raw: true
            });
            currVideo.User = userInfo;

            // add "numComments" key
            let commentCount = await Comment.count({
                where: { videoId: currVideo.id},
                raw: true,
            });
            currVideo.numComments = commentCount
        };
        
        /******************** return query ********************/
        return res
            .status(200)
            .json({
                "Videos": getVideos,
            });

    } catch (err) {
        error.error = err
        return res.json(error);
    };
});

// Create a Video
// api-routes.md, line 486
router.post('/', requireAuth, validateVideo, async (req, res) => {

    let currentUser = req.user
    let currentUserId = req.user.id
    let error = {};

    try {
        
        let { title, subjectId, description, url } = req.body;
        
        /******************** catch errors ********************/
        const validationErrorMessages = []

        // error: missing fields
        if (!title) {
            error.message = "Validation Error";
            error.status = 422;
            validationErrorMessages.push("Title is required")
        }
        if (!subjectId) {
            error.message = "Validation Error";
            error.status = 422;
            validationErrorMessages.push("Subject is required")
        }
        if (!description) {
            error.message = "Validation Error";
            error.status = 422;
            validationErrorMessages.push("Description is required")
        }
        if (!url) {
            error.message = "Validation Error";
            error.status = 422;
            validationErrorMessages.push("Url is required.")
        }
        if (error.message) {
            error.errors = validationErrorMessages;
            return res.status(400).json(error)
        }

        /******************** update db ********************/
        let postVideo = await currentUser.createVideo({
            userId: currentUserId,
            title: title,
            subjectId: subjectId,
            description: description,
            url: url,
        });
        postVideo.save();

        /******************** return newly posted video ********************/
        let getPostedVideo = await Video.findByPk(postVideo.dataValues.id, { raw:true })

        /******************** modify keys ********************/
        // Add "User" key
        let currentUserData = await User.findByPk(currentUserId, {
            attributes: {
                exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
            },
            raw: true,
        });
        getPostedVideo.User = currentUserData

        // Add "Subject" key
        let subjectData = await Subject.findByPk(getPostedVideo.subjectId, { raw: true })
        getPostedVideo.Subject = subjectData

        /******************** return query ********************/
        return res
            .status(201)
            .json(getPostedVideo)

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
