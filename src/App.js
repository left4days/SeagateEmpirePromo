import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import axios from 'axios';
import logo from 'statics/logo.svg';
import get from 'lodash/get';
import { Header } from 'widgets/Header';
import { Modal } from 'ui/Modal';
import DevelopTower from './DevelopTower';
import routes from './routes';
import { signOutUser } from 'widgets/Auth/firebase-configuration';
import style from './style.scss';
import { Description } from 'ui/Description';
import { Loader } from './ui/Loader';
import { Column } from './ui/Layout';

const config = {
    apiKey: 'AIzaSyCpiOLPsXlXMHrzxrzzcs4bpA6z8wkxWFQ',
    authDomain: 'seagateempirepromo.firebaseapp.com',
    databaseURL: 'https://seagateempirepromo.firebaseio.com',
    projectId: 'seagateempirepromo',
    storageBucket: 'seagateempirepromo.appspot.com',
    messagingSenderId: '192211805737',
    appId: '1:192211805737:web:3559f5439a9e6e68dbde38',
};

firebase.initializeApp(config);

class App extends Component {
    state = { modal: null, user: 'loading', actionState: 'loading', mainWinnerData: {} };

    componentWillMount() {
        firebase.auth().onAuthStateChanged(res => {
            const uid = get(res, 'uid', '');
            if (uid) {
                axios.get(`/api/v1/user/${uid}`).then(resData => {
                    const user = { ...res, userData: resData.data };
                    this.setState({ user, modal: null });
                });
            } else {
                this.setState({ user: false });
            }
        });

        axios.get('/api/v1/appState/state').then(res => {
            const { state, mainWinnerData } = get(res, 'data.data', {});
            this.setState({ actionState: state, mainWinnerData });
        });
    }

    handleModal = (type, modalProps) => {
        this.setState({ modal: type, modalProps });
    };

    handleModalClose = () => {
        this.setState({ modal: null });
    };

    signOutUserAction = () => {
        signOutUser();
        this.setState({ user: false });
    };

    onDevValidChange = () => {
        window.localStorage.setItem('devMode', 1);
        this.setState({ devConfirmed: true });
    };

    render() {
        const { modal, user, actionState, mainWinnerData, modalProps } = this.state;
        const isDevMode = !!window.localStorage.getItem('devMode');
        if (actionState === 'loading') {
            return (
                <Column className={style.loading__app} ai="center" jc="center">
                    <img className="header__logo" src={logo} alt="logo" />
                    <Loader />
                </Column>
            );
        }
        if (actionState === 'DEV' && !isDevMode) {
            return <DevelopTower onValidChange={this.onDevValidChange} />;
        }

        return (
            <Router>
                <Header signOutUser={this.signOutUserAction} user={user} />
                <div className="app">
                    {routes.map(route => {
                        const { path, exact, Component } = route;
                        return (
                            <Route
                                key={path}
                                path={path}
                                exact={exact}
                                component={() => (
                                    <Component
                                        user={user}
                                        actionState={actionState}
                                        mainWinnerData={mainWinnerData}
                                        handleModal={this.handleModal}
                                    />
                                )}
                            />
                        );
                    })}
                </div>
                <div className="footer">
                    <Description>© SEAGATE & Team Empire</Description>
                    <Link to="/policy">Политика конфиденциальности</Link>
                </div>
                <Modal
                    modal={modal}
                    handleModal={this.handleModal}
                    onClose={this.handleModalClose}
                    modalProps={modalProps}
                />
            </Router>
        );
    }
}

export default App;
