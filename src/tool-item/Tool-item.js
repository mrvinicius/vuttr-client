import React from 'react';

import './Tool-item.css';

const ToolItem = ({ id, title, link, description, tags, remove, searchedTag }) => (
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
        <section>
            {searchedTag
                ? tags.map((tag, index) => {
                    const matchedTag = 
                        tag.split(searchedTag).reduce((prev, current) => {
                            return <>{prev}<span class='highlight'>{searchedTag}</span>{current}</>
                        });

                    return placeTags(matchedTag, index);
                })
                : tags.map(placeTags)
            }
        </section>
    </div>
);

const placeTags = (tag, index) => (
    <span className="fw600" key={index}>
        #{tag}&nbsp;
    </span>
)

export default ToolItem;