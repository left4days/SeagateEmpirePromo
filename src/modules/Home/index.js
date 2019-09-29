import React from 'react';
import { Column } from 'ui/Layout';
import { MainCard } from './components/MainCard';

import style from './style.scss';
import { SmallCards } from './components/SmallCard';
import { PromoInput } from './components/PromoInput';

function Home({ handleModal, user, actionState, mainWinnerData }) {
    return (
        <Column className={style.home}>
            <Column className={style.container}>
                <MainCard />
                <SmallCards />
                <PromoInput
                    handleModal={handleModal}
                    user={user}
                    actionState={actionState}
                    mainWinnerData={mainWinnerData}
                />
            </Column>
        </Column>
    );
}

export { Home };
