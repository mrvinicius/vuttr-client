import React, { Component } from 'react';

import toolApi from './server-api';
import ToolList from './tool-list/Tool-list';
import Spinner from './spinner/Spinner';
import NewToolModalContainer from './new-tool-modal/New-tool-modal.container';
import Modal from './modal/Modal';

class App extends Component {
	state = {
		tools: [],
		addModalIsOpen: false,
		removalConfirmDialogIsOpen: false,
		toolToBeRemoved: null
	}

	constructor(params) {
		super(params);
		this.addToolsInState = this.addToolsInState.bind(this);
		this.removeTool = this.removeTool.bind(this);
		this.openRemovalConfirmDialog = this.openRemovalConfirmDialog.bind(this);
		this.closeRemovalConfirmDialog = this.closeRemovalConfirmDialog.bind(this);
	}

	async componentDidMount() {
		const tools = await toolApi.getAll();
		this.addToolsInState(...tools);
	}

	closeRemovalConfirmDialog() {
		this.setState({
			removeModalIsOpen: false,
			toolToBeRemoved: null
		});
	}

	openRemovalConfirmDialog({ id, title }) {
		this.setState({
			toolToBeRemoved: {
				id,
				title
			},
			removeModalIsOpen: true
		});
	}

	addToolsInState(...tools) {
		this.setState(prevState => ({ tools: [...prevState.tools, ...tools] }));
	}

	removeTool(id) {
		toolApi.remove(id);
		this.setState(prevState => ({
			tools: prevState.tools.filter(t => t.id !== id)
		}));
		this.closeRemovalConfirmDialog();
		window.alert('The tool has been removed');

	}

	render() {
		return (
			<div className="App">
				<h1>VUTTR</h1>
				<h2>Very Useful Tools to Remember</h2>
				<button onClick={_ => this.setState({ addModalIsOpen: true })}>Add</button>

				{
					this.state.tools && this.state.tools.length
						? <ToolList tools={this.state.tools} remove={this.openRemovalConfirmDialog} />
						: <Spinner />
				}

				<NewToolModalContainer
					isOpen={this.state.addModalIsOpen}
					close={_ => this.setState({ addModalIsOpen: false })}
					addToolsInState={this.addToolsInState} />

				<RemovalConfirmDialog
					isOpen={this.state.removeModalIsOpen}
					close={_ => this.closeRemovalConfirmDialog()}
					remove={this.removeTool}
					tool={this.state.toolToBeRemoved} />
			</div>
		);
	}
}
const RemovalConfirmDialog = props => (
	<Modal {...props} header={<h2>Remove tool</h2>}>
		<p>Are you sure you want to remove <b>{props.tool && props.tool.title}</b>?</p>
		<div className="Modal__actions">
			<button onClick={props.close}>Cancel</button>
			<button onClick={_ => props.remove(props.tool.id)}>Yes, Remove</button>
		</div>
	</Modal>
);

export default App;