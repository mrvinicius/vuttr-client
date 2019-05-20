import React from 'react';
import { mount } from 'enzyme';

import RemovalDialog from './Removal-dialog';

describe('RemovalDialog', () => {
    it('should display tool title', () => {
        const props = {
            isOpen: true,
            tool: {
                id: 10,
                title: 'Useful Tool'
            }
        }

        const removalDialogComponent = mount(<RemovalDialog {...props} />);

        expect(
            removalDialogComponent.find('.Modal__content p')
                .first()
                .text()
        ).toMatch('Useful Tool');

        removalDialogComponent.setProps({
            tool: {
                id: 10,
                title: '0'
            }
        });

        expect(
            removalDialogComponent.find('.Modal__content p')
                .first()
                .text()
        ).toMatch('0');

    })
})