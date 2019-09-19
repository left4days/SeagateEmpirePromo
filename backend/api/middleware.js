const { auth } = require('firebase-admin');

const UserService = require('../services/UserService');

const userService = new UserService();
const authService = auth();

async function requiresAuth(req, res, next) {
    const idToken = req.header('firebase_auth_token');
    let decodedIdToken;

    try {
        decodedIdToken = await authService.verifyIdToken(idToken);
    } catch (error) {
        res.status(501).json({ success: false, errorMessage: error.message });
        return;
    }

    req.user = decodedIdToken;
    next();
}

async function requiresAdmin(req, res, next) {
    const idToken = req.header('firebase_auth_token');
    let decodedIdToken;

    try {
        decodedIdToken = await authService.verifyIdToken(idToken);
    } catch (error) {
        res.status(501).json({ success: false, errorMessage: error.message });
        return;
    }
    const { uid } = decodedIdToken;
    const user = await userService.getUserById(uid);
    const { role } = user;
    if (role !== 'admin') {
        res.status(403).json({ success: false, errorMessage: 'This api forbidden for users' });
    } else {
        req.user = decodedIdToken;
        next();
    }
}

module.exports = {
    requiresAuth,
    requiresAdmin,
};
