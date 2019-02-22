import React from 'react';

import Modal from '../modal/Modal';

const RemovalConfirmDialog = props => (
	<Modal {...props} header={<h2>Remove tool</h2>}>
		<p>Are you sure you want to remove <b>{props.tool && props.tool.title}</b>?</p>
		<div className="Modal__actions">
			<button onClick={props.close}>Cancel</button>
			<button onClick={_ => props.remove(props.tool.id)}>Yes, Remove</button>
		</div>
	</Modal>
);

export default RemovalConfirmDialog;