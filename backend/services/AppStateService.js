const firebaseAdmin = require('firebase-admin');
const db = firebaseAdmin.database();
const appStateRef = db.ref('server/saving-data/fireblog/appState');

const UserService = require('../services/UserService');

const userService = new UserService();

function stateFSM(currentState) {
    switch (currentState) {
        case 'DEV':
            return 'ACTIVE';
        case 'ACTIVE':
            return 'FINISHED';
        case 'FINISHED':
            return 'DEV';
        default:
            return currentState;
    }
}

class AppStateService {
    constructor() {
        this.lastVerifyDevTS = null;
    }

    async getAppState() {
        let state = 'ACTIVE';
        let main_winner = '';
        let product_link = '';
        let main_winner_photo = '';

        await appStateRef.once('value', snap => {
            const { actionState, mainWinner = '', productLink = '', mainWinnerPhoto } = snap.val() || {};

            if (typeof actionState === 'string') {
                state = actionState;
                main_winner = mainWinner;
                product_link = productLink;
                main_winner_photo = mainWinnerPhoto;
            }
        });

        if (main_winner) {
            main_winner = await userService.getUserById(main_winner);
        }
        const { login = '', clicks = 0 } = main_winner;

        return { state, mainWinnerData: { login, main_winner_photo, clicks }, product_link };
    }

    async checkDevAccess(password) {
        let isValid = false;

        await appStateRef.once('value', snap => {
            const { devPassword } = snap.val() || {};

            if (devPassword === password) {
                isValid = true;
                return;
            }
        });

        return isValid;
    }

    async switchAppState(currentState) {
        let newState = currentState;

        if (!currentState) {
            return { success: false, errorMessage: 'invalid state' };
        }

        newState = stateFSM(currentState);

        try {
            await appStateRef.update({ actionState: newState });
        } catch (error) {
            console.log('ERROR IN CHANGE CURRENT APP STATE');
            console.log(error);
            return { success: false, errorMessage: 'ERROR IN CHANGE CURRENT APP STATE' };
        }

        return newState;
    }
}

module.exports = AppStateService;
