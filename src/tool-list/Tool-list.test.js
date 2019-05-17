import React from 'react';
import { mount } from 'enzyme';

import ToolList from "./Tool-list";

describe('ToolItem', () => {
    it('displays the correct number of tools', () => {
        const props = {
            searchedTag: '',
            tools: [
                {
                    id: 1,
                    tags: []
                },
                {
                    id: 2,
                    tags: []
                },
                {
                    id: 3,
                    tags: []
                }
            ]
        }

        const toolListComponent = mount(<ToolList {...props} />);

        expect(
            toolListComponent.childAt(0).children().length
        ).toBe(3);

        toolListComponent.setProps({ tools: [] });

        expect(
            toolListComponent.childAt(0).children().length
        ).toBe(0);

        toolListComponent.setProps({ tools: undefined });

        expect(
            toolListComponent.childAt(0).children().length
        ).toBe(0);
    })
})