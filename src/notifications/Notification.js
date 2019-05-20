import React from 'react';

import './Notification.css';

const Notification = ({ title, body, className }) => (
    <dialog className={`Notification ${className}`} open>
        <div className="Notification__head">{title}</div>
        <div className="Notification__body">{body}</div>
    </dialog>
);

export default Notification;