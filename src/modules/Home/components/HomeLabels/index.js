import React from 'react';
import { Row, Column } from 'ui/Layout';
import config from './config.json';
import style from './style.scss';
import awardIcon from 'statics/award.svg';
import enterIcon from 'statics/enter.svg';
import eggIcon from 'statics/egg.svg';

const ICONS = {
    award: awardIcon,
    enter: enterIcon,
    egg: eggIcon,
};

function getIcon(icon) {
    if (ICONS.hasOwnProperty(icon)) {
        return ICONS[icon];
    }
    return null;
}

function HomeLabels() {
    return (
        <Row jc="space-between" ai="center" className={style.home__labels}>
            {config.map((item, i) => {
                const { icon, text } = item;
                return (
                    <Row className={style.home__label} key={i}>
                        <p className={style.home__label_counter}>{++i}</p>
                        <img className={style.home__label_img} src={getIcon(icon)} alt={icon} />
                        <p className={style.home__label_description}>{text}</p>
                    </Row>
                );
            })}
        </Row>
    );
}

export { HomeLabels };
