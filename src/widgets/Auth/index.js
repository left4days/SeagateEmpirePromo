import React from 'react';
import Formsy from 'formsy-react';
import { Link } from 'react-router-dom';
import { Input } from 'widgets/fields';
import { Column } from 'ui/Layout';
import { Button } from 'ui/Button';
import { Row } from 'ui/Layout';
import { Title } from 'ui/Title';
import { Description } from 'ui/Description';
import { getValidationForField } from './validations';
import config from './config';
import { AuthSocial } from './AuthSocial';
import { getAuthAction } from './helpers';
import { getFirebaseHeaderToken } from 'widgets/requestsHelpers';
import { getValidationError } from './validations-errors';

import style from './style.scss';
import get from 'lodash/get';
import axios from 'axios/index';

function getTitle(authType) {
    switch (authType) {
        case 'login':
            return { title: 'Авторизация', button: 'Войти' };
        case 'reset':
            return { title: 'Восстановить пароль', button: 'Восстановить' };
        case 'auth':
        default:
            return { title: 'Регистрация', button: 'Зарегистрироваться' };
    }
}

function BottomPanel(props) {
    const { authType, handleModal } = props;
    switch (authType) {
        case 'auth':
            return (
                <Description>
                    Нажимая на кнопку Зарегистрироваться, вы подтверждаете свое согласие с
                    <Link to="/policy" target="_blank" className={style.auth__link}>
                        Условиями предоставления услуг
                    </Link>
                </Description>
            );
        case 'login':
            return (
                <Row>
                    <Button className={style.auth__button_more} onClick={() => handleModal('auth')}>
                        Регистрация
                    </Button>
                    <Button className={style.auth__button_more} onClick={() => handleModal('reset')}>
                        Забыли пароль?
                    </Button>
                </Row>
            );
        case 'reset':
        default:
            return null;
    }
}
function AuthHeader({ authType }) {
    switch (authType) {
        case 'reset':
            return <Title align="center">{getTitle(authType).title}</Title>;
        default:
            return (
                <Column>
                    <Title align="center">{getTitle(authType).title}</Title>
                    <Description margin="top_x2" align="center">
                        с помощью аккаунта в соц. сетях
                    </Description>
                    <AuthSocial />
                    <Description align="center" margin="bottom_x2" className={style.auth__or}>
                        или
                    </Description>
                </Column>
            );
    }
}

function ErrorText({ error }) {
    if (!error) {
        return null;
    }
    return <p className={style.auth__error}>{getValidationError(error)}</p>;
}

class Auth extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valid: false,
            error: '',
        };

        this.tryRegisterID = 0;
    }

    formRef = ref => (this.form = ref);

    onValid = () => {
        this.setState({ valid: true });
    };

    onInvalid = () => {
        this.setState({ valid: false });
    };

    componentDidMount() {
        this.tryRegisterID = setTimeout(() => {
            ym(53569510, 'reachGoal', 'registration_try');
        }, 5000);
    }

    componentWillUnmount() {
        clearTimeout(this.tryRegisterID);
    }

    onSubmit = () => {
        const { authType = 'auth', onSubmit } = this.props;
        const model = this.form.getModel();

        if (onSubmit instanceof Function) {
            return onSubmit(model);
        }

        const { login, registerBy = 'email', email } = model;

        getAuthAction(authType, model)
            .then(async res => {
                const { user = {} } = res || {};
                const uid = get(res, 'user.uid', '');
                const data = { login, registerBy, uid, email };
                const options = await getFirebaseHeaderToken();

                ym(53569510, 'reachGoal', 'registration');

                return axios.post('api/v1/user', data, options);
            })
            .catch(error => {
                this.setState({ error: error.code });
                setTimeout(() => this.setState({ error: '' }), 8000);
            });
    };

    render() {
        const { valid, error } = this.state;
        const { authType = 'auth', handleModal } = this.props;

        return (
            <Column>
                <AuthHeader authType={authType} />
                <Formsy
                    onValidSubmit={this.onSubmit}
                    ref={this.formRef}
                    onValid={this.onValid}
                    onInvalid={this.onInvalid}
                >
                    {config[authType].map((item, i) => {
                        const {
                            type,
                            id,
                            name,
                            placeholder,
                            validations,
                            validationsError,
                            margin,
                            autoComplete,
                        } = item;
                        return (
                            <Input
                                validations={getValidationForField(validations)}
                                margin={margin}
                                key={i}
                                validationError={validationsError}
                                required
                                type={type}
                                autoComplete={autoComplete}
                                id={id}
                                placeholder={placeholder}
                                name={name}
                            />
                        );
                    })}
                    <ErrorText error={error} />
                    <Button
                        className={style.auth__button}
                        type="submit"
                        size="full"
                        margin="bottom_x2"
                        disabled={!valid}
                    >
                        {getTitle(authType).button}
                    </Button>
                    <BottomPanel authType={authType} handleModal={handleModal} />
                </Formsy>
            </Column>
        );
    }
}

export { Auth };
