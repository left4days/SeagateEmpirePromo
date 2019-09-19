import React from 'react';
import { Column, Row } from 'ui/Layout';
import { Auth } from 'widgets/Auth';

import style from './style.scss';

function AuthPage(props) {
    const { authType = 'login' } = props;

    return (
        <Row jc="center" ai="center" className={style.auth}>
            <div className={style.auth__wrap}>
                <Auth authType={authType} />
            </div>
        </Row>
    );
}

export { AuthPage };
