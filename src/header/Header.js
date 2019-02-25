import React from 'react';

import './Header.css';

const Header = ({ searchTool, onSearchInTagsChange, onAddClick }) => (
    <header className="Header dark-purple-bg">
        <div className="">
            <h1 className="mb0 heading-1 h1-size white-text">VUTTR</h1>
            <h2 className="m0 heading-2 h2-size white-text">Very Useful Tools to Remember</h2>
        </div>

        <div className="Header__header-controls dark-purple-bg">
            <div className="Header__search-controls mb5px">
                <div className="Search-field-wrapper mr20px">
                    <input className="Search-field-wrapper__field"
                        type="search" name="search" id="search"
                        placeholder="search"
                        onInput={e => searchTool(e.target.value)} />
                    <label htmlFor="search">search</label>
                </div>

                <div className="mt12px mr25px">
                    <input type="checkbox" name="searchInTag" id="searchInTags"
                        onChange={e => onSearchInTagsChange(e.target.checked)} />
                    <label className="white-text" htmlFor="searchInTags">search in tags only</label>
                </div>
            </div>

            <button className="button grow-gradient hide-above-600px"
                onClick={onAddClick}>

                <img className="button__icon" src="/plus.svg" alt="Add Icon" />
                Add
            </button>
        </div>
    </header>
);

export default Header;