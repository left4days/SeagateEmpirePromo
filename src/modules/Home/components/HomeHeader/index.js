import React from 'react';
import { Column, Row } from 'ui/Layout';
import { Title } from 'ui/Title';
import { Button } from 'ui/Button';
import { Description } from 'ui/Description';
import battle from 'statics/battle.png';
import product from 'statics/product.png';

import style from './style.scss';

function sendYMEvent() {
    ym(53569510, 'reachGoal', 'clickBuyButton');
}

function renderButton(product_link) {
    if (product_link) {
        return (
            <a
                className={style.home__header_btn}
                href={product_link}
                rel="noreferrer noopener"
                target="_blank"
                onClick={sendYMEvent}
            >
                Купить
            </a>
        );
    }
    return (
        <div className={style.home__header_wait}>
            <h3>Скоро</h3>
            <p>В продаже</p>
        </div>
    );
}

function HomeHeader({ product_link }) {
    return (
        <Row className={style.home__header} jc="center">
            <Column jc="space-between">
                <Column className={style.home__header_container}>
                    <Title size="l" color="white">
                        Сокровище дракона.
                    </Title>
                    <Title size="l" color="orange">
                        Разбей яйцо - получи приз!
                    </Title>
                </Column>
                <Row className={style.home__block} ai="center" jc="space-between">
                    <Row>
                        <span className={style.home__shape}>x30</span>
                        <img className={style.home__img} src={battle} alt="shape" />
                    </Row>
                    <Column className={style.home__description}>
                        <Title>The International Battlepass</Title>
                        <Description>2019 - Dota 2</Description>
                    </Column>
                </Row>
            </Column>
            <Column className={style.home__product}>
                <img src={product} alt="product" />
                <Row ai="center" className={style.home__product_container}>
                    <h3>
                        Seagate Firecuda Gaming 510 Series <span>M.2 NVME SSD</span>
                    </h3>
                    {renderButton(product_link)}
                </Row>
            </Column>
        </Row>
    );
}

export { HomeHeader };
