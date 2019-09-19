import firebase from 'firebase';
import get from 'lodash/get';
import axios from 'axios';

async function isUserLogged() {
    return !!get(firebase.auth(), 'currentUser');
}

async function getFirebaseHeaderToken() {
    const isLogged = await isUserLogged();
    const currentUser = get(firebase.auth(), 'currentUser') || {};

    if (isLogged && currentUser.getIdToken instanceof Function) {
        const authToken = await currentUser.getIdToken();

        return {
            headers: {
                firebase_auth_token: authToken,
            },
        };
    }

    return {};
}

export { isUserLogged, getFirebaseHeaderToken };
