import React from 'react';
import { mount } from 'enzyme';

import NotificationSection from './Notification-section';

describe('NotificationSection', () => {
    it('displays the correct number of notifications', () => {
        const props = {
            notifications: [
                {
                    className: 'green-bg',
                    duration: 4000,
                    title: <h2 className="white-text">text</h2>
                },
                {
                    className: 'green-bg',
                    duration: 4000,
                    title: <h2 className="white-text">text</h2>
                },
                {
                    className: 'green-bg',
                    duration: 4000,
                    title: <h2 className="white-text">text</h2>
                },
                {
                    className: 'green-bg',
                    duration: 4000,
                    title: <h2 className="white-text">text</h2>
                }
            ]
        }

        const notificationSectionComponent = mount(<NotificationSection {...props} />);

        expect(
            notificationSectionComponent
                .find('.Notification')
                .length
        ).toBe(4);
    });
});