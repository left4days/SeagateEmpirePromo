import React from 'react';
import { Button } from 'ui/Button';
import { Row } from 'ui/Layout';
import { Loader } from 'ui/Loader';
import { HeaderAuthAuthorized } from './AuthorizedHeader';
import style from './style.scss';

function HeaderAuth({ handleModal, user, signOutUser }) {
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
    return (
        <Row jc="flex-end" ai="center" className={style.header__mobile}>
            <Button size="l" style="fill" margin="right_x2" onClick={() => handleModal('auth')}>
                Регистрация
            </Button>
            <Button size="s" onClick={() => handleModal('login')}>
                Вход
            </Button>
        </Row>
    );
}

export { HeaderAuth };
