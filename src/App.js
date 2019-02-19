import React, { Component } from 'react';

import './App.css';
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
		toolToBeRemoved: null,
		searchInTags: false
	}

	constructor(params) {
		super(params);
		this.addToolsInState = this.addToolsInState.bind(this);
		this.closeRemovalConfirmDialog = this.closeRemovalConfirmDialog.bind(this);
		this.openRemovalConfirmDialog = this.openRemovalConfirmDialog.bind(this);
		this.removeTool = this.removeTool.bind(this);
		this.searchTool = this.searchTool.bind(this);
	}

	addToolsInState(...tools) {
		this.setState(prevState => ({ tools: [...prevState.tools, ...tools] }));
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

	removeTool(id) {
		toolApi.remove(id);
		this.setState(prevState => ({
			tools: prevState.tools.filter(t => t.id !== id)
		}));
		this.closeRemovalConfirmDialog();
		window.alert('The tool has been removed');
	}

	async searchTool(text) {
		let tools;

		if (this.state.searchInTags) {
			tools = await toolApi.searchInTags(text.trim());
		} else {
			tools = await toolApi.search(text.trim());
		}

		this.setState({ tools });
	}

	render() {
		return (
			<div className="App">
				<div className="container">
					<header className="Header">
						<h1 className="mb0 h1-size white-text">VUTTR</h1>
						<h2 className="mt0 h2-size white-text">Very Useful Tools to Remember</h2>

						<div className="Header__header-controls">
							<div className="Header__search-controls">
								<div className="Search-field-wrapper">
									<input className="Search-field-wrapper__field" type="search" name="search" id="search"
										placeholder="search" onInput={e => this.searchTool(e.target.value)} />
									<label htmlFor="search">search</label>
								</div>

								<div className="mt12px">
									<input type="checkbox" name="searchInTag" id="searchInTags"
										onChange={e => this.setState({ searchInTags: e.target.checked })} />
									<label className="white-text" htmlFor="searchInTags">search in tags only</label>
								</div>
							</div>

							<button className="button grow-gradient hide-above-600px" onClick={_ => this.setState({ addModalIsOpen: true })}>
								<img className="button__icon" src="/plus.svg" alt="Add Icon" />
								Add
							</button>
							<button className="button-float grow-gradient show-below-601px" onClick={_ => this.setState({ addModalIsOpen: true })}>
								<img className="button__icon" src="/plus.svg" alt="Add Icon" />
							</button>
						</div>
					</header>
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