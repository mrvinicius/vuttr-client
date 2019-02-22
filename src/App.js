import React, { Component } from 'react';

import './App.css';
import toolApi from './server-api';
import Header from './header/Header';
import ToolList from './tool-list/Tool-list';
import Spinner from './spinner/Spinner';
import NewToolModalContainer from './new-tool-modal/New-tool-modal.container';
import RemovalConfirmDialog from './removal-dialog/Removal-dialog';

class App extends Component {
	state = {
		tools: [],
		addModalIsOpen: false,
		removalConfirmDialogIsOpen: false,
		toolToBeRemoved: null,
		searchInTags: false,
		lastSearchText: ''
	}

	constructor(params) {
		super(params);
		this.addToolsInState = this.addToolsInState.bind(this);
		this.closeRemovalConfirmDialog = this.closeRemovalConfirmDialog.bind(this);
		this.onSearchInTagsChange = this.onSearchInTagsChange.bind(this);
		this.openRemovalConfirmDialog = this.openRemovalConfirmDialog.bind(this);
		this.removeTool = this.removeTool.bind(this);
		this.searchTool = this.searchTool.bind(this);
	}

	addToolsInState(...tools) {
		this.setState(prevState => ({ tools: [...prevState.tools, ...tools] }));
	}

	componentDidMount() {
		toolApi.getAll().then(tools => this.addToolsInState(...tools));

		const header = document.querySelector('.App .Header');

		document.addEventListener('scroll', e => {
			header.classList.toggle('Header--shortened', window.pageYOffset > 50);
		});
	}

	closeRemovalConfirmDialog() {
		this.setState({
			removeModalIsOpen: false,
			toolToBeRemoved: null
		});
	}

	onSearchInTagsChange(checked) {
		this.setState({ searchInTags: checked }, _ => {
			if (this.state.lastSearchText) {
				this.searchTool(this.state.lastSearchText);
			}
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

		this.setState({ lastSearchText: text })
		this.setState({ tools });
	}

	render() {
		return (
			<div className="App">
				<div className="container">
					<Header
						searchTool={this.searchTool}
						onSearchInTagsChange={this.onSearchInTagsChange}
						onAddClick={_ => this.setState({ addModalIsOpen: true })} />
					<button className="button-float grow-gradient show-below-601px" onClick={_ => this.setState({ addModalIsOpen: true })}>
						<img className="button__icon" src="/plus.svg" alt="Add Icon" />
					</button>
					<section className="Tool-list">
						{
							this.state.tools && this.state.tools.length
								? <ToolList tools={this.state.tools} remove={this.openRemovalConfirmDialog} />
								: <Spinner />
						}
					</section>

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

export default App;