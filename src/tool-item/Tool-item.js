import React from 'react';

import './Tool-item.css';

const ToolItem = ({ id, title, link, description, tags, remove }) => (
    <div className="Tool-item">
        <header className="Tool-item__header">
            <h2 className="Tool-item__title"><a href={link}>{title}</a></h2>
            <button className="button-flat red-text"
                onClick={_ => remove({ id, title })}>
                <img className="button__icon" src="/close.svg" alt="Remove Icon" />
                Remove
            </button>
        </header>
        <p className="Tool-description">{description}</p>
        <div>
            {tags.map((tag, i) =>
                <span className="fw600" key={i}>#{tag} </span>
            )}
        </div>
    </div>
);

export default ToolItem;