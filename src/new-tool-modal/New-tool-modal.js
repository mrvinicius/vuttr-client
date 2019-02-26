import React from 'react';

import Modal from '../modal/Modal';

const NewToolModal = props => (
    <Modal {...props} header={
        <>
            <img className="Modal__header-icon" src="/plus.svg" alt="Add Icon" />
            <h2 className="Modal__title">Add new tool</h2>
        </>
    }>
        <form autoComplete="off" onSubmit={props.handleSubmit}>
            <span>{props.errors.formMessage ? props.errors.formMessage : null}</span>

            <div className="form-group">
                <label htmlFor="name">Tool name</label>
                <input autoComplete="off" type="text" name="title" id="title" />
                <span>{props.errors.title ? props.errors.title.message : null}</span>
            </div>

            <div className="form-group">
                <label htmlFor="link">Tool link</label>
                <input autoComplete="off" type="text" name="link" id="link" />
                <span>{props.errors.link ? props.errors.link.message : null}</span>
            </div>

            <div className="form-group">
                <label htmlFor="description">Tool description</label>
                <textarea autoComplete="off" className="disable-resize" rows="4" name="description" id="description"></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="tags">Tags</label>
                <input autoComplete="off" type="text" name="tags" id="tags"
                    onKeyDown={handleTagKeyDown(props.addTag)} />
            </div>

            <div>
                {props.tags.map(tag => `${tag} `)}
            </div>

            <div className="Modal__actions">
                <button className="button green-bg">Add</button>
            </div>
        </form>
    </Modal>
);

function handleTagKeyDown(callback) {
    const commaKeyCode = 188,
        enterKeyCode = 13;

    return (event) => {
        if (event.keyCode === commaKeyCode || event.keyCode === enterKeyCode) {
            event.preventDefault();
            callback(event.target.value.trim());
            event.target.value = "";
        }
    }
}

export default NewToolModal;