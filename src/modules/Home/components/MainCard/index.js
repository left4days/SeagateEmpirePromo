import React from 'react';
import cx from 'classnames';
import { Title } from 'ui/Title';
import { Description } from 'ui/Description';
import { Column } from 'ui/Layout';
import style from './style.scss';

function MainCard() {
    return (
        <Column className={cx(style.banner)}>
            <Column className={style.banner__inner}>
                <Title weight="700" size="l" extraCLass={style.banner__title}>
                    SEAGATE PASS
                </Title>
                <Description size="l" weight="500" className={style.banner__description}>
                    Введи секретный код и стань участником розыгрыша!
                </Description>
            </Column>
        </Column>
    );
}

export { MainCard };
