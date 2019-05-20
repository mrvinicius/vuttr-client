import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './Notification-section.css';
import Notification from './Notification';

const NotificationSection = (props) => (
    <TransitionGroup component={'section'} className="notification-container">
        {props.notifications.map((notification, index) =>
            <CSSTransition
                unmountOnExit
                timeout={notification.duration}
                classNames="slide-up" key={index}>
                <Notification {...notification} />
            </CSSTransition>
        )}
    </TransitionGroup>
);

export default NotificationSection;