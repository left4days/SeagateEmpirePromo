import React from 'react';
import get from 'lodash/get';
import axios from 'axios';
import firebase from 'firebase';

import { Column, Row } from 'ui/Layout';
import { isUserLogged, getFirebaseHeaderToken } from 'widgets/requestsHelpers';
import handIcon from 'statics/hand.svg';

import style from './style.scss';

const DEBOUNCE = 1000; //ms
const FORCE_UPDATE_CLICKS_AFTER = 20; //clicks

function renderButton(actionState, onClick) {
    if (actionState === 'FINISHED') {
        return null;
    }
    return (
        <Column jc="center" ai="center">
            <button className={style.clicker__btn} onClick={onClick}>
                <img className={style.clicker__img} src={handIcon} alt="hand-icon" />
            </button>
        </Column>
    );
}

function renderText(actionState, displayedClicks) {
    if (actionState === 'FINISHED') {
        return null;
    }
    return (
        <Column>
            <p className={style.clicker__title}>Ты сделал уже</p>
            <div className={style.clicker__button}>
                <p className={style.clicker__count}>{displayedClicks}</p>
                <p className={style.clicker__text}>кликов</p>
            </div>
        </Column>
    );
}

class Clicker extends React.PureComponent {
    constructor(props) {
        super(props);

        this.timeoutId = null;

        this.state = {
            confirmedClicks: 0,
            currentSeriesCount: 0,
            displayedClicks: 0,
        };
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(async res => {
            const uid = get(res, 'uid', '');
            const options = await getFirebaseHeaderToken();
            const { getConfirmedClicks } = this.props;

            axios.get(`/api/v1/click/${uid}`, options).then(res => {
                const confirmedClicks = get(res, 'data.data.confirmedClicks', 0);
                this.setState({ confirmedClicks, displayedClicks: confirmedClicks });
                getConfirmedClicks(confirmedClicks);
            });
        });
    }

    registerClicks = () => {
        const { confirmedClicks, currentSeriesCount } = this.state;
        const currentSerie = currentSeriesCount;

        if (currentSerie < 1) {
            return;
        }

        if (currentSerie > 1000) {
            this.setState({ currentSeriesCount: 0 });
            return;
        }

        this.setState({ currentSeriesCount: 0 }, async () => {
            const options = await getFirebaseHeaderToken();
            axios
                .post(`/api/v1/click/`, { count: currentSerie }, options)
                .then(() => {
                    this.setState({ confirmedClicks: confirmedClicks + currentSerie });
                })
                .catch(() => {
                    const { currentSeriesCount } = this.state;
                    console.warn('save locally', currentSeriesCount, currentSerie);
                    this.setState({ currentSeriesCount: currentSeriesCount + currentSerie });
                });
        });
    };

    debounceHandle() {
        const { currentSeriesCount } = this.state;
        clearTimeout(this.timeoutId);

        // if (currentSeriesCount > FORCE_UPDATE_CLICKS_AFTER) {
        //     this.registerClicks();
        //     clearTimeout(this.timeoutId);
        //     this.timeoutId = null;
        // } else {
        this.timeoutId = setTimeout(this.registerClicks, DEBOUNCE);
        // }
    }

    handleClick = () => {
        const { user, handleModal } = this.props;
        const { displayedClicks, currentSeriesCount, confirmedClicks } = this.state;
        if (!user) {
            return handleModal('auth');
        }

        this.setState(
            { currentSeriesCount: currentSeriesCount + 1, displayedClicks: displayedClicks + 1 },
            this.debounceHandle
        );
    };

    render() {
        const { displayedClicks } = this.state;
        const { actionState, user } = this.props;

        return (
            <Column className={style.clicker}>
                {renderText(actionState, displayedClicks)}
                {renderButton(actionState, this.handleClick)}
            </Column>
        );
    }
}

export { Clicker };
