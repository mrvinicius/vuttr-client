import React from 'react';

import ToolItem from '../tool-item/Tool-item';

const ToolList = ({ tools }) => (
    <>
        {tools.map(ToolItem)}
    </>
);

export default ToolList;