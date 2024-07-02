const router = require('express').Router();

// Import routers
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const subjectsRouter = require('./subjects.js');
const videosRouter = require('./videos.js');
const commentsRouter = require('./comments.js');

const { restoreUser } = require('../../utils/auth.js');
const { setTokenCookie } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

// Initialize routers globally
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/subjects', subjectsRouter);
router.use('/videos', videosRouter);
router.use('/comments', commentsRouter);


router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});


/************************* TEST ROUTES *************************/
router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});

// GET /api/set-token-cookie
router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
        where: {
            username: 'Demo-lition'
        }
    });
    setTokenCookie(res, user);
    return res.json({ user });
});

// GET /api/restore-user
router.get(
    '/restore-user',
    (req, res) => {
        return res.json(req.user);
    }
);

// GET /api/require-auth
router.get(
    '/require-auth',
    requireAuth,
    (req, res) => {
        return res.json(req.user);
    }
);

module.exports = router;
