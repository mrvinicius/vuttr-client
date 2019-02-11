import React from 'react';

import ToolItem from '../tool-item/Tool-item';

const ToolList = ({ tools }) => (
    <section>
        {tools.map(ToolItem)}
    </section>
);

export default ToolList;