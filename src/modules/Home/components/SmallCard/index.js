import React from 'react';
import cx from 'classnames';
import { Column, Row } from 'ui/Layout';
import { Title } from 'ui/Title';
import { Button } from 'ui/Button';
import { Description } from 'ui/Description';

import style from './style.scss';

function RenderLabel() {
    return <span className={style.card__label}>X10</span>;
}

function SmallCards() {
    return (
        <Row className={style.cards}>
            <Column className={cx(style.card, style.card_1)}>
                <Column className={style.card__inner}>
                    <Column className={style.card__content}>
                        <Description weight="600" className={style.card__description} size="m">
                            TOM CLANCY'S
                        </Description>
                        <Title containerClassName={style.card__title} size="m" weight="600">
                            RAINBOW SIX
                            <br /> SIEGE
                        </Title>
                    </Column>
                    <Button size="full">Купить</Button>
                </Column>
                <RenderLabel />
            </Column>
            <Column className={cx(style.card, style.card_2)}>
                <Column className={style.card__inner}>
                    <Column className={style.card__content}>
                        <Title containerClassName={style.card__title} size="m" weight="600">
                            SEAGATE
                        </Title>
                        <Description weight="600" className={style.card__description} size="m">
                            Firecuda Gaming 510
                            <br /> Series M.2 NVME SSD
                        </Description>
                    </Column>
                    <Button size="full">Купить</Button>
                </Column>
            </Column>
            <Column className={cx(style.card, style.card_3)}>
                <Column className={style.card__inner}>
                    <Column className={cx(style.card__content, style.card__content_1)}>
                        <Description weight="600" className={style.card__description} size="m">
                            Выиграй
                        </Description>
                        <Title containerClassName={style.card__title} size="m" weight="600">
                            STEAM-CARD
                        </Title>
                        <Description weight="600" className={style.card__description} size="m">
                            Номиналом 5-10-20$
                        </Description>
                    </Column>
                    <Column className={cx(style.card__content, style.card__content_2)}>
                        <Title containerClassName={style.card__title} size="m" weight="600">
                            РЮКЗАК
                        </Title>
                        <Description weight="600" className={style.card__description} size="m">
                            Firecuda
                        </Description>
                    </Column>
                </Column>
                <RenderLabel />
            </Column>
        </Row>
    );
}

export { SmallCards };
