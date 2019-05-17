import React from 'react';
import { mount } from 'enzyme';

import Modal from "./Modal";

describe('Modal', () => {
    it('displays when is required', () => {
        const props = {
            isOpen: true
        }

        const modalComponent = mount(<Modal {...props} />);

        expect(
            modalComponent.find('.modal-overlay').hasClass('modal-overlay')
        ).toBe(true)

    })
})