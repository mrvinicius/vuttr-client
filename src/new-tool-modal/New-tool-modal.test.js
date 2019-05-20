import React from 'react';
import { mount } from 'enzyme';

import NewToolModal from './New-tool-modal';

describe('NewToolModal', () => {
    const props = {
        isOpen: true
    }
    let newToolModalComponent;

    const createNewToolModalComponent = (props) => {
        if (!newToolModalComponent)
            newToolModalComponent = mount(<NewToolModal {...props} />);

        return newToolModalComponent;
    }

    beforeEach(() => {
        newToolModalComponent = undefined;
    })

    it('shows alert when an error occurs', () => {
        const newToolModalComponent = createNewToolModalComponent({
            ...props,
            errors: {
                formMessage: 'Network error ocurred'
            }
        });

        expect(
            newToolModalComponent.containsMatchingElement(
                <strong>Network error ocurred</strong>
            )
        ).toBeTruthy();
    });

    it('toggles title input error message', () => {
        const newToolModalComponent = createNewToolModalComponent({
            ...props,
            errors: {
                title: 'Preencha o nome da ferrramenta'
            }
        });

        expect(
            newToolModalComponent
                .find('input#title')
                .closest('div')
                .find('span strong')
                .text()
        ).toMatch('Preencha o nome da ferrramenta');

        newToolModalComponent.setProps({ errors: { title: '' } })

        expect(
            newToolModalComponent
                .find('input#title')
                .closest('div')
                .containsMatchingElement(
                    <span></span>
                )
        ).toBeFalsy();
    });

    it('toggles link input error message', () => {
        const newToolModalComponent = createNewToolModalComponent({
            ...props,
            errors: {
                link: 'Preencha o link da ferrramenta'
            }
        });

        expect(
            newToolModalComponent
                .find('input#link')
                .closest('div')
                .find('span strong')
                .text()
        ).toMatch('Preencha o link da ferrramenta');

        newToolModalComponent.setProps({ errors: { link: '' } })

        expect(
            newToolModalComponent
                .find('input#link')
                .closest('div')
                .containsMatchingElement(
                    <span></span>
                )
        ).toBeFalsy();
    });
})