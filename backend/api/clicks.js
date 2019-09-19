const { requiresAuth, requiresAdmin } = require('./middleware');
const ClickService = require('../services/ClickService');

const clickService = new ClickService();

async function updateUserClicks(req, res, next) {
    const { body, user } = req;
    const { count = 0 } = body;
    const { user_id = '' } = user;
    const result = await clickService.updateUserClicks(user_id, count);

    res.json({ success: true, data: result });
}

async function getUserClicks(req, res, next) {
    const { uid } = req.params;
    const confirmedClicks = await clickService.getUserClicksById(uid);

    res.json({ success: true, data: { confirmedClicks } });
}

async function getAllUserClicks(req, res, next) {
    const result = await clickService.getAllUsersAndCkicks();

    res.json({ success: true, data: result });
}

module.exports = {
    GET: [['/api/v1/click/:uid', requiresAuth, getUserClicks], ['/api/v1/clicks', requiresAdmin, getAllUserClicks]],
    POST: [['/api/v1/click/', requiresAuth, updateUserClicks]],
};
