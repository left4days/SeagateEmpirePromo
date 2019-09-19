import Formsy from 'formsy-react';
import React, { Component } from 'react';
import cx from 'classnames';
import get from 'lodash/get';
import axios from 'axios';

import { Button } from 'ui/Button';
import { Input } from 'widgets/fields';

import style from './style.scss';
class DevelopTower extends React.PureComponent {
    formRef = ref => (this.form = ref);

    onSubmit = () => {
        const model = this.form.getModel();
        const { onValidChange } = this.props;

        axios.post('/api/v1/appState/check-dev', model).then(res => {
            const isValid = get(res, 'data.data', false);

            if (isValid) {
                onValidChange(true);
            }
        });
    };

    render() {
        return (
            <div className={cx(style.app, style.app_indev)}>
                <p>Акция еще не началась. Чтобы войти в режим разработки введите пароль:</p>
                <Formsy onValidSubmit={this.onSubmit} ref={this.formRef}>
                    <Input required type="text" name="devPassword" />
                </Formsy>
                <Button onClick={this.onSubmit}>Отправить</Button>
            </div>
        );
    }
}

export default DevelopTower;
