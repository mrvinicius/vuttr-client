import React from 'react';

import Modal from '../modal/Modal';

const RemovalConfirmDialog = props => (
	<Modal {...props} header={
		<>
			<img className="Modal__header-icon" src="/close-blue.svg" alt="Removal Icon" />
			<h2 className="Modal__title">Remove tool</h2>
		</>
	}>
		<p>Are you sure you want to remove <strong>{props.tool && props.tool.title}</strong>?</p>
		<div className="Modal__actions">
			<button className="button-flat grey-text"
				onClick={props.close}>Cancel</button>
			<button className="button red-bg white-text"
				onClick={() => props.remove(props.tool.id)}>Yes, Remove</button>
		</div>
	</Modal>
);

export default RemovalConfirmDialog;