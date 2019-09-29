import React from 'react';
import { Auth } from 'widgets/Auth';
import { ErrorModal } from 'widgets/ErrorModal';

export function getModal(type, handleModal, modalProps) {
    switch (type) {
        case 'auth':
            return <Auth authType="auth" handleModal={handleModal} />;
        case 'login':
            return <Auth authType="login" handleModal={handleModal} />;
        case 'reset':
            return <Auth authType="reset" handleModal={handleModal} />;
        case 'error':
            return <ErrorModal />;
        default:
            return null;
    }
}
