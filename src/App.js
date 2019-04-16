import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './App.css';
import toolApi from './server-api';
import Header from './header/Header';
import ToolList from './tool-list/Tool-list';
import NewToolModalContainer from './new-tool-modal/New-tool-modal.container';
import RemovalConfirmDialog from './removal-dialog/Removal-dialog';
import Notification from './notification/Notification';

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

		document.addEventListener('scroll', _ => {
			header.classList.toggle('Header--shortened', window.pageYOffset > 50);

			if (window.pageYOffset > lastScrollTop) {
				this.setState({ isAddFloatBtnShown: false });
			} else {
				this.setState({ isAddFloatBtnShown: true });
			}

			lastScrollTop = window.pageYOffset;
		});
	}

	toggleNewToolModalDisplay = _ => {
		this.setState({ isAddModalOpen: !this.state.isAddModalOpen });
		this.toggleBodyScroll();
	}

	closeRemovalConfirmDialog = _ => {
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
		this.setState({ searchInTags: checked }, _ => {
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
		})
	}

	searchTool = async text => {
		let tools;

		if (this.state.searchInTags) {
			tools = await toolApi.searchInTags(text.trim());
		} else {
			tools = await toolApi.search(text.trim());
		}

		this.setState({ lastSearchedText: text, tools });
	}

	toggleBodyScroll = _ => {
		const isBodyScrollEnabled = !this.state.isBodyScrollEnabled;

		this.setState({ isBodyScrollEnabled }, _ => {
			document.body.style.overflowY =
				isBodyScrollEnabled ? 'auto' : 'hidden';
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
		})
	}

	showNotification = notification => {
		this.setState(prevState =>
			({ notifications: [...prevState.notifications, notification] }),
			_ => setTimeout(this.removeNotification, notification.duration, notification)
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
				
				<TransitionGroup component={'section'} className="notification-container">
					{this.state.notifications.map((notification, index) =>
						<CSSTransition
							unmountOnExit
							timeout={notification.duration}
							classNames="slide-up" key={index}>
							<Notification {...notification} />
						</CSSTransition>
					)}
				</TransitionGroup>

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