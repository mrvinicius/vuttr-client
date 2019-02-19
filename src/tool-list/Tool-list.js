import React from 'react';

import ToolItem from '../tool-item/Tool-item';

const ToolList = ({ tools, remove }) => (
    <>
        {tools.map(
            tool => <ToolItem {...tool} key={tool.id} remove={remove} />
        )}
    </>
);

export default ToolList;