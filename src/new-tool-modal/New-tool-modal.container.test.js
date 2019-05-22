import React from 'react';
import { mount } from 'enzyme';

import NewToolModalContainer from './New-tool-modal.container';

describe('NewToolModalContainer', () => {
    const props = {
        isOpen: true
    }
    let newToolModalContainerComp;

    const createNewToolModalContainerComp = (props) => {
        if (!newToolModalContainerComp)
            newToolModalContainerComp = mount(<NewToolModalContainer {...props} />);

        return newToolModalContainerComp;
    }

    beforeEach(() => {
        newToolModalContainerComp = undefined;
    })

    describe('when closes', () => {
        const wrapper = createNewToolModalContainerComp({
            ...props,
            close: () => { }
        });

        it('reset errors', () => {
            wrapper.setState({
                errors: {
                    title: 'Title error message example',
                    link: 'Link error message example'
                }
            });

            wrapper.find('.modal-overlay.open').simulate('click');

            expect(
                wrapper.find('input#title')
                    .closest('div')
                    .children()
                    .last()
                    .text()
            ).not.toMatch('Title error message example');

            expect(
                wrapper.find('input#link')
                    .closest('div')
                    .children()
                    .last()
                    .text()
            ).not.toMatch('Link error message example');
        });

        it('reset form state', () => {
            // Fill inputs
            const titleNode = wrapper.find('#title').getDOMNode();
            titleNode.value = 'Title Example';

            const linkNode = wrapper.find('#link').getDOMNode();
            linkNode.value = 'title.example.com';

            const descriptionNode = wrapper.find('#description').getDOMNode();
            descriptionNode.value = 'Tool description example';

            const tagsNode = wrapper.find('#tags').getDOMNode();
            tagsNode.value = 'tag1 tag2 tag3';

            // To close, simulate Click outside 
            wrapper.find('.modal-overlay.open').simulate('click');

            expect(titleNode.value).toBeFalsy();
            expect(linkNode.value).toBeFalsy();
            expect(descriptionNode.value).toBeFalsy();
            expect(tagsNode.value).toBeFalsy();
        });
    });
});