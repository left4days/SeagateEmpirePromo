import React from 'react';
import { Column, Row } from 'ui/Layout';
import { Button } from 'ui/Button';
import { Title } from 'ui/Title';
import style from './style.scss';

function UserHeading({ onClick, text, buttonText }) {
    return (
        <Row ai="center" jc="space-between" className={style.admin__heading}>
            <Title size="l">{text}</Title>
            <Button onClick={onClick}>{buttonText}</Button>
        </Row>
    );
}

export { UserHeading };
