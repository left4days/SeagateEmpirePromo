import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import firebase from 'firebase';
import get from 'lodash/get';
import cx from 'classnames';

import { getFirebaseHeaderToken } from 'widgets/requestsHelpers';
import { Button } from 'ui/Button';
import { Title } from 'ui/Title';
import { Row, Column } from 'ui/Layout';
import { Loader } from 'ui/Loader';
import { UserRow } from './UserRow';
import { UserHeading } from './UserHeading';

import style from './style.scss';

function stateText(currentState) {
    switch (currentState) {
        case 'DEV':
            return 'Начать акцию';
        case 'ACTIVE':
            return 'Закончить акцию';
        case 'FINISHED':
            return 'В режим разработки';
        default:
            return currentState;
    }
}

function SwitchActionStateButton({ actionState, onClick }) {
    return <Button onClick={onClick}>{stateText(actionState)}</Button>;
}

function Table({ text, onClick, buttonText, data }) {
    return (
        <Column>
            <UserHeading text={text} onClick={onClick} buttonText={buttonText} />
            <Column ai="flex-start">
                <UserRow
                    user={{
                        login: 'LOGIN',
                        email: 'EMAIL',
                        registerBy: 'REGISTERED BY',
                        contact: 'CONTACT',
                    }}
                />
                {data.map((user, i) => (
                    <UserRow withLink key={user.login + user.clicks} idx={i + 1} user={user} />
                ))}
            </Column>
        </Column>
    );
}

class AdminPanel extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            winners: [],
            mainWinners: [],
            isUserAdmin: false,
            actionState: 'ACTIVE',
            users: 0,
        };
    }

    componentWillMount = () => {
        firebase.auth().onAuthStateChanged(() => {
            this.getCurrentAppState();
            this.getCurrentWinners();
            this.getCurrentTopWinners();
        });
    };

    getCurrentWinners = async () => {
        const options = await getFirebaseHeaderToken();
        axios.get('/api/v1/user/winners/30', options).then(res => {
            this.setState({ winners: res.data.data, isUserAdmin: true });
        });
    };

    getCurrentTopWinners = async () => {
        const options = await getFirebaseHeaderToken();
        axios.get('/api/v1/user/winners/top/1', options).then(res => {
            this.setState({ mainWinners: res.data.data, isUserAdmin: true });
        });
    };

    getCurrentAppState = async () => {
        axios.get('/api/v1/appState/state').then(res => {
            const { state, mainWinnerEmail } = get(res, 'data.data', {});
            this.setState({ actionState: state, mainWinnerEmail });
        });
    };

    determineWinners = async () => {
        const options = await getFirebaseHeaderToken();
        axios.get('/api/v1/user/winners/create/30', options).then(res => {
            this.setState({ winners: res.data.data });
        });
    };

    determineTopWinner = async () => {
        const options = await getFirebaseHeaderToken();
        axios.get('/api/v1/user/winners/top/create/1', options).then(res => {
            this.setState({ mainWinners: res.data.data });
        });
    };

    switchAppState = async currentState => {
        const { actionState } = this.state;
        const options = await getFirebaseHeaderToken();
        const data = { currentState: actionState };
        axios.post('/api/v1/appState/switchState', data, options).then(res => {
            this.setState({ actionState: res.data.data });
        });
    };

    getAllUsers = async () => {
        const options = await getFirebaseHeaderToken();
        axios.get('/api/v1/users', options).then(async res => {
            const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + res.data);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', 'all-users.csv');
            document.body.appendChild(link); // Required for FF

            link.click(); // This will download the data file named "my_data.csv".
        });
    };

    render() {
        const { isUserAdmin, actionState, winners, mainWinners } = this.state;
        const { user } = this.props;

        if (user === 'loading' || !isUserAdmin) {
            return (
                <Column className={cx(style.admin, style.admin_loading)}>
                    <Loader />
                </Column>
            );
        }

        return (
            <Column className={style.admin}>
                <Column className={style.admin__container}>
                    <Row className={style.admin__header}>
                        <SwitchActionStateButton actionState={actionState} onClick={this.switchAppState} />
                        <Button size="m" margin="left" onClick={this.getAllUsers}>
                            Выгрузить полный список участников
                        </Button>
                    </Row>
                    <Column>
                        <Table
                            text="Главный победитель"
                            onClick={this.determineTopWinner}
                            buttonText="Определить"
                            data={mainWinners}
                        />
                        <Table
                            text="30 победителей"
                            onClick={this.determineWinners}
                            buttonText="Определить"
                            data={winners}
                        />
                    </Column>
                </Column>
            </Column>
        );
    }
}

AdminPanel.propTypes = {
    className: PropTypes.string,
};

AdminPanel.defaultProps = {
    className: '',
};

export { AdminPanel };
