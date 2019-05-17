import React from 'react';
import { mount } from 'enzyme';

import ToolItem from "./Tool-item";

describe('ToolItem', () => {
    describe('displays the correct number of tags', () => {
        it('when no tag is provided', () => {
            const props = {
                id: 1,
                tags: []
            }
            const toolItemComponent = mount(<ToolItem {...props} />);

            expect(
                toolItemComponent.find('.Tool-item__tags').children().length
            ).toBe(0);
        })

        it('when multiple tag is provided', () => {
            const props = {
                id: 1,
                tags: ['tag1', 'tag2']
            }
            const toolItemComponent = mount(<ToolItem {...props} />);

            expect(
                toolItemComponent.find('.Tool-item__tags').children().length
            ).toBe(2);
        })
    })

    it('highlights searched text inside the tags', () => {
        const props = {
            id: 1,
            searchedTag: 'N',
            tags: ['plaNNiNg']
        }

        const highlightedElements = mount(<ToolItem {...props} />)
            .find('.Tool-item__tags .highlight');

        expect(
            highlightedElements.map(el => el.text())
                .filter(text => text === 'N')
                .length
        ).toBe(3);
    })
})