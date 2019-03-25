import React from 'react';

import './Tool-list.css';
import ToolItem from '../tool-item/Tool-item';

const ToolList = ({ tools, remove, searchedTag }) => (
    <>
        {tools.map(
            tool => <ToolItem {...tool}
                key={tool.id}
                remove={remove}
                searchedTag={searchedTag} />
        )}
    </>
);

export default ToolList;