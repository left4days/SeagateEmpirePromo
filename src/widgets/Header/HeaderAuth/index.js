import React from 'react';
import { Row } from 'ui/Layout';
import { Loader } from 'ui/Loader';
import { HeaderAuthAuthorized } from './AuthorizedHeader';
import style from './style.scss';

function HeaderAuth({ user, signOutUser }) {
    if (user === 'loading') {
        return (
            <Row jc="flex-end" ai="center">
                <Loader />
            </Row>
        );
    }
    if (user) {
        return <HeaderAuthAuthorized user={user} signOutUser={signOutUser} />;
    }
    return <div />;
}

export { HeaderAuth };
