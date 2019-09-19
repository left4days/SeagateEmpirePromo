import React from 'react';

const VALIDATION_ERRORS = {
    'auth/expired-action-code': 'Срок действия кода истек',
    'auth/invalid-action-code': 'Этот код недействителен',
    'auth/user-disabled': 'Пользователь отключен',
    'auth/user-not-found': 'Пользователь не найден',
    'auth/weak-password': 'Невалидный пароль',
    'auth/email-already-in-use': 'Пользователь с таким email уже существует',
    'auth/invalid-email': 'Неверно указан email',
    'auth/operation-not-allowed': 'Аккаунт отключен',
    'auth/wrong-password': 'Неверный пароль или емейл',
    'auth/email-already-exists': 'Указанный адрес электронной почты уже используется.',
};

export function getValidationError(error) {
    if (VALIDATION_ERRORS.hasOwnProperty(error)) {
        return VALIDATION_ERRORS[error];
    }
    return error;
}
