import React from 'react';
import cx from 'classnames';
import { Row, Column } from 'ui/Layout';
import style from './style.scss';
import emailIcon from 'statics/email_icon.svg';

function getHref(login, email, registerBy) {
    switch (registerBy) {
        case 'email':
            return `mailto:${email}?subject=Поздравляем!%20Вы%20выиграли%20приз%20в%20конкурсе%20от%20Empire&amp;body="Test%20body"`;
        case 'vk':
            return `https://vk.com/${login}`;
        case 'google.com':
            return `mailto:${email}?subject=Поздравляем!%20Вы%20выиграли%20приз%20в%20конкурсе%20от%20Empire&amp;body="Test%20body"`;
        default:
            return '#';
    }
}

function renderLink(withLink, login, email, registerBy) {
    if (!withLink) {
        return <p className={style.admin__row_item}>CONTACT</p>;
    }
    return (
        <a
            className={cx(style.admin__row_item, style.admin__image)}
            target="_blank"
            href={getHref(login, email, registerBy)}
            rel="noopener nooferrer"
        >
            <img src={emailIcon} alt="email_icon" />
        </a>
    );
}

function UserRow({ user, idx = '№', withLink }) {
    const { login = '-', clicks = 0, registerBy = '-', email = '-' } = user;

    return (
        <Row className={style.admin__row}>
            <p className={style.admin__row_item}>{idx}</p>
            <p className={style.admin__row_item}>{login}</p>
            <p className={style.admin__row_item}>{email}</p>
            <p className={style.admin__row_item}>{registerBy}</p>
            <p className={style.admin__row_item}>{clicks}</p>
            {renderLink(withLink, login, email, registerBy)}
        </Row>
    );
}

export { UserRow };
