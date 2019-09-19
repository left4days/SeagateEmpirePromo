import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Column } from 'ui/Layout';
import { getModal } from './modals';

import style from './style.scss';

function closeButton(onClose) {
    return (
        <button onClick={onClose} className={style.modal_close}>
            x
        </button>
    );
}

function Modal({ modal, handleModal, onClose }) {
    return (
        <div className={cx(style.modal, modal && style.modal_open)}>
            <Column className={style.modal__inner}>
                {getModal(modal, handleModal)}
                {closeButton(onClose)}
            </Column>
        </div>
    );
}

Modal.propTypes = {
    open: PropTypes.bool,
};

Modal.defaultProps = {
    open: false,
};

export { Modal };
