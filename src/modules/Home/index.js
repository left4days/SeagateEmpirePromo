import React from 'react';
import cx from 'classnames';
import { Column, Row } from 'ui/Layout';
import { Clicker } from 'widgets/Clicker';
import { HomeHeader } from './components/HomeHeader';
import { HomeLabels } from './components/HomeLabels';
import { HomeInfo } from './components/HomeInfo';
import { countLabel } from './components/HomeInfo/helpers.js';
import style from './style.scss';

function renderBg(confirmedClicks, actionState) {
    if (actionState === 'FINISHED') {
        return style.home__background_5;
    }
    return style[`home__background_${countLabel(confirmedClicks).background}`];
}

class Home extends React.Component {
    state = { confirmedClicks: 0 };

    getConfirmedClicks = confirmedClicks => {
        if (!confirmedClicks) {
            return null;
        }
        return this.setState({ confirmedClicks });
    };

    render() {
        const { confirmedClicks } = this.state;
        const { user, handleModal, actionState, mainWinnerData, product_link } = this.props;

        return (
            <Column className={cx(style.home, renderBg(confirmedClicks, actionState))}>
                <Column className={style.home__container}>
                    <Column>
                        <HomeHeader product_link={product_link} />
                        <HomeLabels />
                        <Column ai="center">
                            <HomeInfo
                                confirmedClicks={confirmedClicks}
                                actionState={actionState}
                                mainWinnerData={mainWinnerData}
                            />
                            <Clicker
                                getConfirmedClicks={this.getConfirmedClicks}
                                user={user}
                                actionState={actionState}
                                handleModal={handleModal}
                            />
                        </Column>
                    </Column>
                </Column>
            </Column>
        );
    }
}

export { Home };
