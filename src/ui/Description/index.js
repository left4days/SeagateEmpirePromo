import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const Description = ({ children, align, className, margin, size, weight }) => {
    return (
        <p
            className={cx(
                style.description,
                style[`description__align_${align}`],
                style[`description__margin_${margin}`],
                style[`description__weight_${weight}`],
                style[`description__size_${size}`],
                className
            )}
        >
            {children}
        </p>
    );
};

Description.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    size: PropTypes.oneOf(['s', 'm', 'l']),
    weight: PropTypes.oneOf(['500', '600', '700', '800']),
    margin: PropTypes.oneOf(['left', 'right', 'top', 'bottom', 'left_x2', 'right_x2', 'top_x2', 'bottom_x2', false]),
};

Description.defaultProps = {
    children: '',
    className: '',
    align: 'left',
    size: 's',
    weight: '500',
    margin: false,
};
export { Description };
