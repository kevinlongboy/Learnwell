const store = {


    // SLICE 1
    session: {

        // Branch A
        user: {
            id: Number,
            firstName: String,
            lastName: String,
            email: String,
            username: String,
            token: String,
        }
    },


    // SLICE 2
    subjects: {

        // Branch A
        allSubjects: [
            {
                id: Number,
                name: String,
                url: String,
            },
        ],

        // Branch B
        singleSubjectDetails: {
            id: Number,
            name: String,
            url: String,
            // normalized object
            Videos: [
                {
                    id: Number,
                    userId: Number,
                    title: String,
                    length: String,
                    description: String,
                    url: String,
                    previewImage: String,
                    numComments: Number,
                    createdAt: String,
                    updatedAt: String,
                },
            ],
        },
    },


    // SLICE 3
    videos: {

        // Branch A
        singleVideoDetails: {
            id: Number,
            userId: Number,
            title: String,
            length: String,
            description: String,
            url: String,
            previewImage: String,
            numComments: Number,
            createdAt: String,
            updatedAt: String,
            Subject: {
                id: Number,
                name: String,
            },
            // normalized object
            Comments: [
                {
                    id: Number,
                    userId: Number,
                    videoId: Number,
                    comment: String,
                    createdAt: String,
                    updatedAt: String,
                },
            ]
        }
    },


    // SLICE 4
    comments: {

        // Branch A
        // normalized object
        singleVideoComments: {
            [commentId]: {
                id: Number,
                videoId: Number,
                userId: Number,
                comment: String,
                createdAt: String,
                updatedAt: String,
                User: {
                    id: Number,
                    firstName: String,
                    lastName: String,
                    username: String,
                },
            }
        },

        // Branch B
        // normalized object
        allCommentsByUser: {
            [commentId]: {
                id: Number,
                videoId: Number,
                userId: Number,
                comment: String,
                createdAt: String,
                updatedAt: String,
                Video: {
                    id: Number,
                    subjectId: Number,
                    name: String,
                    previewImage: String,
                }
            }
        }
    },
}