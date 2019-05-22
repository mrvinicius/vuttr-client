import React from 'react';

import './Tool-item.css';

const ToolItem = ({ id, title, link, description, tags, remove, searchedTag }) => (
    <div className="Tool-item">
        <header className="Tool-item__header">
            <h2 className="Tool-item__title"><a href={link}>{title}</a></h2>
            <button className="button-flat red-text"
                onClick={() => remove({ id, title })}>
                <img className="button__icon" src="/close.svg" alt="Remove Icon" />
                Remove
            </button>
        </header>
        <p className="Tool-item__description">{description}</p>
        <section className="Tool-item__tags">
            {searchedTag
                ? highlightMatchedTags(tags, searchedTag)
                : tags.map(placeTag)
            }
        </section>
    </div>
);

const highlightMatchedTags = (tags, searchedTag) => {
    const regex = new RegExp(searchedTag, 'ig');

    return tags.map((tag, index) => {
        const handledTag = tag
            .replace(regex, match => ` ${match} `)
            .trim()
            .split(' ')
            .reduce((prev, current) => {
                return <>
                    {prev}
                    {regex.test(current)
                        ? <mark className='highlight'>{current}</mark>
                        : current}

                </>
            }, '');

        return placeTag(handledTag, index);
    })
}

const placeTag = (tag, index) => (
    <span className="fw600" key={index}>
        #{tag}&nbsp;
    </span>
)

export default ToolItem;