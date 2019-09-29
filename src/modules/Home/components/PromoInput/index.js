import React from 'react';
import cx from 'classnames';
import Formsy from 'formsy-react';
import { getValidationForField } from 'widgets/Auth/validations';
import { Input } from 'widgets/fields';
import { Row, Column } from 'ui/Layout';
import { Button } from 'ui/Button';
import { Title } from 'ui/Title';
import axios from 'axios';
import style from './style.scss';
import nextIcon from 'statics/play-button.svg';
import tickIcon from 'statics/tick.svg';
import { Loader } from 'ui/Loader';

function RenderLoader({ loading }) {
    if (loading) {
        return <Loader color="white" />;
    }
    return <img src={nextIcon} alt="next" />;
}

function PromoContainer({ user, valid, loading, onSubmit, actionState, mainWinnerData }) {
    if (actionState === 'FINISHED') {
        const { login, main_winner_photo } = mainWinnerData;
        console.log(login, main_winner_photo);
        return (
            <Column className={style.promo__ok} ai="center">
                <Title extraCLass={style.promo__title} margin="top_x2" size="m" align="center" weight="600">
                    Акция завершена!
                </Title>
                <Title margin="top">Главный победитель:</Title>
                <Row ai="center" jc="center" className={style.promo__winner}>
                    <Title size="m" margin="right">
                        {login}
                    </Title>
                    <img className={style.promo__img} src={main_winner_photo} alt="winnerPhoto" />
                </Row>
                <Column />
            </Column>
        );
    }
    if (user && user !== 'loading') {
        return (
            <Column className={style.promo__ok} ai="center">
                <div className="modal__error_img">
                    <img src={tickIcon} alt="close" />
                </div>
                <Title margin="top_x2" size="m" align="center">
                    Поздравляем, Вы участвуете в акции!
                </Title>
            </Column>
        );
    } else {
        return (
            <Row className={cx(style.promo__input, valid && style.promo__input_valid)}>
                <Input
                    validations={getValidationForField('promo')}
                    validationError="Формат кода не верен"
                    required
                    type="text"
                    mask="promoCode"
                    id="promoCode"
                    placeholder="Ввести код"
                    autoComplete=""
                    name="promoCode"
                />
                <Button
                    className={cx(style.promo__button, valid && style.promo__button_valid)}
                    type="submit"
                    size="full"
                    margin="bottom_x2"
                    disabled={!valid}
                    onClick={onSubmit}
                >
                    <RenderLoader loading={loading} />
                </Button>
            </Row>
        );
    }
}

class PromoInput extends React.Component {
    state = {
        valid: false,
        error: '',
        loading: false,
    };

    formRef = ref => (this.form = ref);

    onValid = () => {
        this.setState({ valid: true });
    };

    onInvalid = () => {
        this.setState({ valid: false });
    };

    onSubmit = () => {
        const model = this.form.getModel();
        const { handleModal } = this.props;
        this.setState({ loading: true });
        return axios.post('api/v1/promocode/check', model).then(res => {
            const { isValidPromoCode } = res.data.data;
            setTimeout(() => {
                this.setState({ loading: false });
                if (isValidPromoCode) {
                    return handleModal('auth');
                } else {
                    return handleModal('error');
                }
            }, 400);
        });
    };

    render() {
        const { valid, loading } = this.state;
        const { user, actionState, mainWinnerData } = this.props;
        return (
            <Formsy ref={this.formRef} onValid={this.onValid} onInvalid={this.onInvalid}>
                <Column className={style.promo}>
                    <PromoContainer
                        valid={valid}
                        loading={loading}
                        user={user}
                        onSubmit={this.onSubmit}
                        actionState={actionState}
                        mainWinnerData={mainWinnerData}
                    />
                </Column>
            </Formsy>
        );
    }
}

export { PromoInput };
