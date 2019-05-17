import React from 'react';

import './Tool-list.css';
import ToolItem from '../tool-item/Tool-item';

const ToolList = ({ remove, searchedTag, tools = [] }) => (
    <section className="Tool-list">
        {tools.map(
            tool => <ToolItem {...tool}
                key={tool.id}
                remove={remove}
                searchedTag={searchedTag} />
        )}
    </section>
);

export default ToolList;