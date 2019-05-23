import React, { Component } from 'react';

import './App.css';
import toolApi from './server-api';
import Header from './header/Header';
import ToolList from './tool-list/Tool-list';
import NewToolModalContainer from './new-tool-modal/New-tool-modal.container';
import RemovalConfirmDialog from './removal-dialog/Removal-dialog';
import Notifications from './notifications';

class App extends Component {
	state = {
		tools: [],
		isAddFloatBtnShown: true,
		isAddModalOpen: false,
		isRemovalConfirmDialogOpen: false,
		isBodyScrollEnabled: true,
		toolToBeRemoved: null,
		searchInTags: false,
		lastSearchedText: '',
		notifications: []
	}

	addToolsInState = (...tools) => {
		this.setState(prevState => ({ tools: prevState.tools.concat(tools) }));
	}

	componentDidMount() {
		toolApi.getAll().then(tools => this.addToolsInState(...tools));

		const header = document.querySelector('.App .Header');
		let lastScrollTop = window.pageYOffset;

		document.addEventListener('scroll', () => {
			header.classList.toggle('Header--shortened', window.pageYOffset > 50);

			this.setState({
				isAddFloatBtnShown: window.pageYOffset > lastScrollTop ? false : true
			});

			lastScrollTop = window.pageYOffset;
		});
	}

	toggleNewToolModalDisplay = () => {
		this.setState({ isAddModalOpen: !this.state.isAddModalOpen });
		this.toggleBodyScroll();
	}

	closeRemovalConfirmDialog = () => {
		this.setState({
			isRemovalConfirmDialogOpen: false,
			toolToBeRemoved: null
		});
		this.toggleBodyScroll();
	}

	openRemovalConfirmDialog = ({ id, title }) => {
		this.setState({
			toolToBeRemoved: { id, title },
			isRemovalConfirmDialogOpen: true
		});
		this.toggleBodyScroll();
	}

	toggleSearchInTags = checked => {
		this.setState({ searchInTags: checked }, () => {
			if (this.state.lastSearchedText) {
				this.searchTool(this.state.lastSearchedText);
			}
		});
	}

	removeTool = id => {
		toolApi.remove(id);
		this.setState(prevState => ({
			tools: prevState.tools.filter(tool => tool.id !== id)
		}));
		this.closeRemovalConfirmDialog();
		this.showNotification({
			className: 'green-bg',
			duration: 4000,
			title:
				<h2 className="white-text">
					<strong>Tool</strong> removed
				</h2>,
		});
	}

	searchTool = async text => {
		this.setState({
			lastSearchedText: text,
			tools: this.state.searchInTags
				? await toolApi.searchInTags(text.trim())
				: await toolApi.search(text.trim())
		});
	}

	toggleBodyScroll = () => {
		const isBodyScrollEnabled = !this.state.isBodyScrollEnabled;

		this.setState({ isBodyScrollEnabled }, () => {
			document.body.style.overflowY = isBodyScrollEnabled ? 'auto' : 'hidden';
		});
	}

	handleAddedTool = addedTool => {
		this.addToolsInState(addedTool);
		this.showNotification({
			className: 'green-bg',
			duration: 4000,
			title:
				<h2 className="white-text">
					<strong>{addedTool.title}</strong> successfully added
				</h2>,
		});
	}

	showNotification = notification => {
		this.setState(prevState =>
			({ notifications: [...prevState.notifications, notification] }),
			() => setTimeout(this.removeNotification, notification.duration, notification)
		);
	}

	removeNotification = notification => {
		this.setState(prevState => ({
			notifications: prevState.notifications
				.filter(ntf => ntf !== notification)
		}));
	}

	render() {
		return (
			<div className="App">
				<Notifications notifications={this.state.notifications} />

				<div className="container">
					<Header searchTool={this.searchTool}
						toggleSearchInTags={this.toggleSearchInTags}
						onAddClick={this.toggleNewToolModalDisplay} />

					<button className={`button-float grow-gradient show-below-601px
						${this.state.isAddFloatBtnShown ? '' : 'button-float--hide'}`}
						onClick={this.toggleNewToolModalDisplay}>

						<img className="button__icon" src="/plus.svg" alt="Add Icon" />
					</button>

					<ToolList tools={this.state.tools}
						remove={this.openRemovalConfirmDialog}
						searchedTag={this.state.searchInTags
							? this.state.lastSearchedText.trim()
							: null
						} />
				</div>

				<NewToolModalContainer
					isOpen={this.state.isAddModalOpen}
					close={this.toggleNewToolModalDisplay}
					handleAddedTool={this.handleAddedTool} />

				<RemovalConfirmDialog
					isOpen={this.state.isRemovalConfirmDialogOpen}
					close={this.closeRemovalConfirmDialog}
					remove={this.removeTool}
					tool={this.state.toolToBeRemoved} />
			</div>
		);
	}
}

export default App;