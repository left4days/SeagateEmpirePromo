import React from 'react';
import cx from 'classnames';
import { Column, Row } from 'ui/Layout';
import { Title } from 'ui/Title';
import groupIcon from 'statics/group.svg';
import { countLabel } from './helpers';
import style from './style.scss';

function renderText(confirmedClicks, actionState) {
    if (actionState === 'FINISHED') {
        return null;
    }
    if (!confirmedClicks || confirmedClicks < 100) {
        return 'Кликай и зарабатывай очки!';
    }
    return `Поздравляю! Ты сделал больше кликов чем ${countLabel(confirmedClicks).text}% других участников!`;
}

function HomeInfo({ confirmedClicks, actionState, mainWinnerData }) {
    if (actionState === 'FINISHED') {
        const { login, main_winner_photo, clicks } = mainWinnerData;
        return (
            <Column className={cx(style.home__info, style.home__info_winner)}>
                <Title size="l">Конкурс завершен!</Title>
                <Title size="m">Главный победитель:</Title>
                <Column ai="center" jc="center">
                    <Row className={style.home__info_client} ai="center" jc="center">
                        <img className={style.home__info_photo} src={main_winner_photo} alt="group-icon" />
                        <Column className={style.home__info_margin}>
                            <Title>{login}</Title>
                        </Column>
                    </Row>
                </Column>
            </Column>
        );
    }
    return (
        <Column className={style.home__info}>
            <img className={style.home__info_image} src={groupIcon} alt="group-icon" />
            <p className={style.home__info_description}>{renderText(confirmedClicks, actionState)}</p>
        </Column>
    );
}

export { HomeInfo };
