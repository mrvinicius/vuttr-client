import React from 'react';

import Modal from '../modal/Modal';

const NewToolModal = props => (
    <Modal {...props} header={
        <>
            <img className="Modal__header-icon" src="/plus.svg" alt="Add Icon" />
            <h2 className="Modal__title">Add new tool</h2>
        </>
    }>
        <strong className="red-text fw600 mb15px">
            {props.errors.formMessage ? props.errors.formMessage : null}
        </strong>

        <form id="newToolModal" name="NewToolModal"
            autoComplete="off" onSubmit={props.handleSubmit}>

            <div className="form-group">
                <input autoComplete="off" type="text" name="title" id="title" />
                <label htmlFor="name">Tool name</label>
                {props.errors.title
                    ? <InputErrorMessage text={props.errors.title} />
                    : null}
            </div>

            <div className="form-group">
                <input autoComplete="off" type="text" name="link" id="link" />
                <label htmlFor="link">Tool link</label>
                {props.errors.link
                    ? <InputErrorMessage text={props.errors.link} />
                    : null}
            </div>

            <div className="form-group">
                <textarea autoComplete="off" className="disable-resize"
                    rows="3" name="description" id="description">
                </textarea>

                <label htmlFor="description">Tool description</label>
            </div>

            <div className="form-group">
                <input autoComplete="off" type="text" name="tags" id="tags" />
                <label htmlFor="tags">Tags</label>
            </div>

            <div className="Modal__actions">
                <button className="button green-bg"
                    disabled={props.isSubmitDisabled}>
                    Add
                </button>
            </div>
        </form>
    </Modal>
);

const InputErrorMessage = props => (
    <span className="red-text fz16px df">
        <img src="/alert-triangle.svg" alt="Error Icon"
            className="mr5px" />
        <strong>{props.text}</strong>
    </span>
)

export default NewToolModal;