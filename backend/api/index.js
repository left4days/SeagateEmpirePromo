const express = require('express');
const router = express.Router();
const { auth } = require('firebase-admin');

const userApi = require('./user');
const clicksApi = require('./clicks');
const appStateApi = require('./appState');

const authService = auth();

function createRoutes(route) {
    const { GET = [], POST = [], PUT = [], DELETE = [] } = route;

    GET.forEach(function(route) {
        const [url, ...callbacks] = route;
        router.get(url, ...[callbacks]);
    });

    POST.forEach(function(route) {
        const [url, ...callbacks] = route;
        router.post(url, ...[callbacks]);
    });
}

function applyRoutes(app) {
    createRoutes(userApi, router);
    createRoutes(clicksApi, router);
    createRoutes(appStateApi, router);

    router.get('/api/*', (req, res, next) => {
        res.json({ success: true, message: 'This api url is not declared' });
    });

    app.use(router);
}

module.exports = { applyRoutes };
