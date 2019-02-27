import React from 'react';

import Modal from '../modal/Modal';

const RemovalConfirmDialog = props => (
	<Modal {...props} header={
		<>
            <img className="Modal__header-icon" src="/close-blue.svg" alt="Removal Icon" />
			<h2 className="Modal__title">Remove tool</h2>
		</>
	}>
		<p>Are you sure you want to remove <b>{props.tool && props.tool.title}</b>?</p>
		<div className="Modal__actions">
			<button className="button-flat"
				onClick={props.close}>Cancel</button>
			<button className="button red-bg white-text"
				onClick={_ => props.remove(props.tool.id)}>Yes, Remove</button>
		</div>
	</Modal>
);

export default RemovalConfirmDialog;