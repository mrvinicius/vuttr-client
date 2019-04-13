import React from 'react';

import Modal from '../modal/Modal';

const NewToolModal = props => (
    <Modal {...props} header={
        <>
            <img className="Modal__header-icon" src="/plus.svg" alt="Add Icon" />
            <h2 className="Modal__title">Add new tool</h2>
        </>
    }>
        <form id="newToolModal" autoComplete="off" onSubmit={props.handleSubmit}>
            <span>{props.errors.formMessage ? props.errors.formMessage : null}</span>

            <div className="form-group">
                <input autoComplete="off" type="text" name="title" id="title" />
                <label htmlFor="name">Tool name</label>
                {props.errors.title ?
                    <span className="red-text fz16px df">
                        <img src="/alert-triangle.svg" alt="Alert Icon"
                            className="mr5px" />
                        {props.errors.title.message}
                    </span>
                    : null
                }
            </div>

            <div className="form-group">
                <input autoComplete="off" type="text" name="link" id="link" />
                <label htmlFor="link">Tool link</label>
                {props.errors.link ?
                    <span className="red-text fz16px df">
                        <img src="/alert-triangle.svg" alt="Alert Icon"
                            className="mr5px" />
                        {props.errors.link.message}
                    </span>
                    : null
                }
            </div>

            <div className="form-group">
                <textarea autoComplete="off" className="disable-resize"
                    rows="3" name="description" id="description"></textarea>
                <label htmlFor="description">Tool description</label>
            </div>

            <div className="form-group">
                <input autoComplete="off" type="text" name="tags" id="tags" />
                <label htmlFor="tags">Tags</label>
            </div>

            <div className="Modal__actions">
                <button className="button green-bg" disabled={props.isSubmitDisabled}>Add</button>
            </div>
        </form>
    </Modal>
);

export default NewToolModal;