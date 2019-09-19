import { loginUser, registerUser, resetUser } from './firebase-configuration';

export function getAuthAction(authType, model) {
    const { login, email, password } = model;
    switch (authType) {
        case 'login':
            return loginUser(email, password);
        case 'reset':
            return resetUser(email);
        case 'auth':
        default:
            return registerUser(login, email, password, 'email');
    }
}

export function getAllUrlParams(url) {
    const obj = {};

    if (url) {
        const arr = url.split('&');

        for (let i = 0; i < arr.length; i++) {
            let a = arr[i].split('=');

            let paramName = a[0];
            let paramValue = typeof a[1] === 'undefined' ? true : a[1];

            paramName = paramName.toLowerCase().replace('#', '');
            if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

            if (paramName.match(/\[(\d+)?\]$/)) {
                const key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];

                if (paramName.match(/\[\d+\]$/)) {
                    const index = /\[(\d+)\]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    obj[key].push(paramValue);
                }
            } else {
                if (!obj[paramName]) {
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    // otherwise add the property
                    obj[paramName].push(paramValue);
                }
            }
        }
    }
    return obj;
}
