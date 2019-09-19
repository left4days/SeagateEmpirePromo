const UserService = require('../services/UserService');
const { requiresAdmin, requiresAuth } = require('./middleware');

const userService = new UserService();

async function checkIsUserExist(req, res, next) {
    res.json({ success: false, errorMessage: 'This login already exist', meta: { login: false } });
}

async function getUserData(req, res, next) {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);

    res.json(user);
}

async function registerUser(req, res) {
    const user = await userService.registerNewUser(req.body);

    res.json({ success: true });
}

async function getTopClickers(req, res) {
    const users = await userService.getTopClickers(req.params);

    res.json({ success: true, data: users });
}

async function getWinners(req, res) {
    const users = await userService.getWinners(req.params);

    res.json({ success: true, data: users });
}

async function generateWinners(req, res) {
    const users = await userService.generateWinners(req.params);

    res.json({ success: true, data: users });
}

async function customRegisterNewUser(req, res) {
    const custom_token = await userService.customRegisterNewUser(req.body);

    res.json({ success: true, data: { custom_token } });
}

async function getAllUsers(req, res) {
    const users_csv = await userService.getAllUsersInCSV(req.params);

    res.setHeader('Content-Disposition', 'attachment; filename=data.csv');
    res.setHeader('content-type', 'text/csv');
    res.status(200).send(new Buffer(users_csv));
}

module.exports = {
    GET: [
        ['/api/v1/user/:userId', getUserData],
        ['/api/v1/users', requiresAdmin, getAllUsers],
        ['/api/v1/user/top/:limit', requiresAdmin, getTopClickers],
        ['/api/v1/user/winners/:limit', requiresAdmin, getWinners],
        ['/api/v1/user/winners/create/:limit', requiresAdmin, generateWinners],
    ],
    POST: [['/api/v1/user', registerUser], ['/api/v1/custom-register', customRegisterNewUser]],
};
