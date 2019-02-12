import React from 'react';

import './Modal.css';

const Modal = ({ header, children, actions, isOpen, close }) => (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={getExitHandler(close)}>
        <div className="Modal">
            <div className="Modal__header">
                {header}
            </div>
            <div className="Modal__content">
                {children}
            </div>
            {actions ? <div className="Modal__actions">
                {actions}
            </div> : null}
        </div>
    </div>
);

function getExitHandler(callback) {
    return event => {
        if (event.target === event.currentTarget) {
            callback()
        }
    }
}

export default Modal;