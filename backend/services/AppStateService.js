const firebaseAdmin = require('firebase-admin');
const db = firebaseAdmin.database();
const appStateRef = db.ref('appState');

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
        let main_winners = '';
        let main_winner_photo = '';

        await appStateRef.once('value', snap => {
            const { actionState, mainWinners = [], mainWinnerPhoto } = snap.val() || {};

            if (typeof actionState === 'string') {
                state = actionState;
                main_winners = mainWinners;
                main_winner_photo = mainWinnerPhoto;
            }
        });

        if (main_winners) {
            let id = '';
            main_winners.map(item => (id = item));
            main_winners = await userService.getUserById(id);
        }
        const { login = '' } = main_winners;

        return { state, mainWinnerData: { login, main_winner_photo } };
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
