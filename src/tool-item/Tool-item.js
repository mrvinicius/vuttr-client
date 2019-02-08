import React from 'react';

const ToolItem = ({ id, title, link, description, tags }) => (
    <div key={id}>
        <h2><a href={link}>{title}</a></h2>
        <h3>{description}</h3>
        {tags.map((tag, i) =>
            <span key={i}>{tag} </span>
        )}
    </div>
);

export default ToolItem;