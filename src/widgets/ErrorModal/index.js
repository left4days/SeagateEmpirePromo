import React from 'react';
import { Column } from 'ui/Layout';
import { Title } from 'ui/Title';
import { Description } from 'ui/Description';
import closeIcon from 'statics/close.svg';
import style from './style.scss';
function ErrorModal() {
    return (
        <Column className={style.modal__error}>
            <Column ai="center">
                <div className={style.modal__error_img}>
                    <img src={closeIcon} alt="close" />
                </div>
            </Column>
            <Title size="m" margin="top_x2">
                Неверный код!
            </Title>
            <Description size="m" margin="top">
                Найди спрятанный код в контенте группы{' '}
                <a rel="noreferrer noopener" target="_blank" href="https://vk.com/empirepage">
                    Вконтакте
                </a>
            </Description>
        </Column>
    );
}

export { ErrorModal };
