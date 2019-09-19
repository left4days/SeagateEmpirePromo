import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import style from './style.scss';

function Loader({ size, color }) {
    return (
        <div
            className={cx(style.loader__item, style[`loader__item_size_${size}`], style[`loader__item_color_${color}`])}
        />
    );
}

Loader.propTypes = {
    size: PropTypes.oneOf(['s', 'm', 'l']),
    color: PropTypes.oneOf(['white', 'orange']),
};

Loader.defaultProps = {
    size: 's',
    color: 'orange',
};

export { Loader };
