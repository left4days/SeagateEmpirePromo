import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import axios from 'axios';
import get from 'lodash/get';

import { Header } from 'widgets/Header';
import { Modal } from 'ui/Modal';
import DevelopTower from './DevelopTower';
import routes from './routes';
import { signOutUser } from 'widgets/Auth/firebase-configuration';

import style from './style.scss';

const config = {
    apiKey: 'AIzaSyDDaaOyfmalL4ZzY1tlTneHbmdZ29tkxgc',
    authDomain: 'dragoneggteamepmire.firebaseapp.com',
    databaseURL: 'https://dragoneggteamepmire.firebaseio.com',
    projectId: 'dragoneggteamepmire',
    storageBucket: 'dragoneggteamepmire.appspot.com',
    messagingSenderId: '201187011326',
};

firebase.initializeApp(config);

class App extends Component {
    state = { modal: null, user: 'loading', actionState: 'ACTIVE', mainWinnerData: {}, product_link: false };

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
            const { state, mainWinnerData, product_link } = get(res, 'data.data', {});
            this.setState({ actionState: state, mainWinnerData, product_link });
        });
    }

    handleModal = type => {
        this.setState({ modal: type });
    };

    handleModalClose = () => {
        this.setState({ modal: null });
    };

    signOutUserAction = () => {
        signOutUser();
        this.setState({ user: false });
    };

    formRef = ref => (this.form = ref);

    onDevValidChange = () => {
        window.localStorage.setItem('devMode', 1);
        this.setState({ devConfirmed: true });
    };

    render() {
        const { modal, user, actionState, mainWinnerData, product_link } = this.state;
        const isDevMode = !!window.localStorage.getItem('devMode');
        if (actionState === 'DEV' && !isDevMode) {
            return <DevelopTower onValidChange={this.onDevValidChange} />;
        }

        return (
            <Router>
                <Header handleModal={this.handleModal} signOutUser={this.signOutUserAction} user={user} />
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
                                        product_link={product_link}
                                        mainWinnerData={mainWinnerData}
                                        handleModal={this.handleModal}
                                    />
                                )}
                            />
                        );
                    })}
                </div>
                <div className="footer">
                    <Link to="/policy">Политика конфиденциальности</Link>
                </div>
                <Modal modal={modal} handleModal={this.handleModal} onClose={this.handleModalClose} />
            </Router>
        );
    }
}

export default App;
