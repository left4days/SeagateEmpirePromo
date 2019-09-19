import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Column } from 'ui/Layout';
import { HeaderAuth } from './HeaderAuth';
import fireCudaLogo from 'statics/logo_firecuda.svg';
import seagateLogo from 'statics/seagate.svg';
import logo from 'statics/logo.svg';
import style from './style.scss';

function Header({ handleModal, user, signOutUser }) {
    return (
        <Column className={style.header} ai="center" jc="space-between">
            <Row className={style.header__container}>
                <Row jc="flex-start" className={style.header__logo_double}>
                    <img className={style.header__logo} src={seagateLogo} alt="seagate" />
                    <img className={style.header__logo} src={fireCudaLogo} alt="firecuda" />
                </Row>
                <Column className={style.header__logo_container}>
                    <Link to="/">
                        <img className={style.header__logo} src={logo} alt="logo" />
                    </Link>
                </Column>
                <HeaderAuth handleModal={handleModal} user={user} signOutUser={signOutUser} />
            </Row>
        </Column>
    );
}

export { Header };
