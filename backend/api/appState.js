const { requiresAdmin } = require('./middleware');
const AppStateService = require('../services/AppStateService');

const appStateService = new AppStateService();

async function getAppState(req, res, next) {
    const result = await appStateService.getAppState();

    res.json({ success: true, data: result });
}

async function checkDevAccess(req, res, next) {
    const { body = {} } = req;
    const { devPassword = '' } = body;
    const isValid = await appStateService.checkDevAccess(devPassword);

    res.json({ success: true, data: isValid });
}

async function switchAppState(req, res, next) {
    const { body } = req;
    const { currentState = '' } = body;

    const result = await appStateService.switchAppState(currentState);

    res.json({ success: true, data: result });
}

module.exports = {
    GET: [['/api/v1/appState/state', getAppState]],
    POST: [
        ['/api/v1/appState/switchState', requiresAdmin, switchAppState],
        ['/api/v1/appState/check-dev', checkDevAccess],
    ],
};
