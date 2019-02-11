import React from 'react';

import Modal from '../modal/Modal';

const NewToolModal = props => (
    <Modal {...props} closeCallback={props.close} header={<h2>Add new tool</h2>}>
        <form onSubmit={props.handleSubmit}>
            <span>{props.errors.formMessage ? props.errors.formMessage : null}</span>

            <div className="form-group">
                <label htmlFor="name">Tool name</label>
                <input type="text" name="title" id="title" />
                <span>{props.errors.title ? props.errors.title.message : null}</span>
            </div>

            <div className="form-group">
                <label htmlFor="link">Tool link</label>
                <input type="text" name="link" id="link" />
                <span>{props.errors.link ? props.errors.link.message : null}</span>
            </div>

            <div className="form-group">
                <label htmlFor="description">Tool description</label>
                <textarea name="description" id="description"></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="tags">Tags</label>
                <input type="text" name="tags" id="tags"
                    onKeyDown={handleTagKeyDown(props.addTag)} />
            </div>

            <div>
                {props.tags.map(tag => `${tag} `)}
            </div>

            <div className="Modal__actions">
                <button type="submit">Add tool</button>
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