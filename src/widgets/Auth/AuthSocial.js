import React from 'react';
import { Row } from 'ui/Layout';
import { signWithSocial } from './firebase-configuration';
import fbIcon from 'statics/social/fb.svg';
import twIcon from 'statics/social/tw.svg';
import googleIcon from 'statics/social/google.svg';
import vkIcon from 'statics/social/vk.svg';

import style from './style.scss';

const socialConfig = [{ type: 'vk', icon: vkIcon }, { type: 'google', icon: googleIcon }];

function AuthSocial() {
    return (
        <Row ai="center" jc="center" className={style.social__container}>
            {socialConfig.map(item => {
                const { type, icon } = item;
                return (
                    <button className={style.social} key={type} onClick={() => signWithSocial(type)}>
                        <img src={icon} alt="social-icon" />
                    </button>
                );
            })}
        </Row>
    );
}

export { AuthSocial };
