import React from 'react';

export function countLabel(confirmedClicks) {
    if (confirmedClicks >= 100 && confirmedClicks < 500) {
        return {
            text: '20',
            background: '2',
        };
    }
    if (confirmedClicks >= 500 && confirmedClicks < 1000) {
        return {
            text: '40',
            background: '2',
        };
    }
    if (confirmedClicks >= 1000 && confirmedClicks < 10000) {
        return {
            text: '60',
            background: '3',
        };
    }
    if (confirmedClicks >= 10000) {
        return {
            text: '80',
            background: '4',
        };
    }
    return { background: '1' };
}
