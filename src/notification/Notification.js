import React from 'react';

import './Notification.css';

const Notification = ({ head, body, className }) => (
    <dialog className={`Notification ${className}`} open>
        <div className="Notification__head">{head}</div>
        <div className="Notification__body">{body}</div>
    </dialog>
);

export default Notification;