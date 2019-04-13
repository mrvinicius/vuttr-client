import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './App.css';
import toolApi from './server-api';
import Header from './header/Header';
import ToolList from './tool-list/Tool-list';
import Spinner from './spinner/Spinner';
import NewToolModalContainer from './new-tool-modal/New-tool-modal.container';
import RemovalConfirmDialog from './removal-dialog/Removal-dialog';
import Notification from './notification/Notification';

class App extends Component {
	state = {
		tools: [],
		showAddFloatBtn: true,
		addModalIsOpen: false,
		removalConfirmDialogIsOpen: false,
		bodyScrollEnabled: true,
		toolToBeRemoved: null,
		searchInTags: false,
		lastSearchText: '',
		notifications: []
	}

	addToolsInState = (...tools) => {
		this.setState(prevState => ({ tools: [...prevState.tools, ...tools] }));
	}

	componentDidMount() {
		toolApi.getAll().then(tools => this.addToolsInState(...tools));

		const header = document.querySelector('.App .Header');
		let lastScrollTop = window.pageYOffset;

		document.addEventListener('scroll', e => {
			header.classList.toggle('Header--shortened', window.pageYOffset > 50);

			if (window.pageYOffset > lastScrollTop) {
				this.setState({ showAddFloatBtn: false });
			} else {
				this.setState({ showAddFloatBtn: true });
			}

			lastScrollTop = window.pageYOffset;
		});
	}

	closeRemovalConfirmDialog = _ => {
		this.setState({
			removeModalIsOpen: false,
			toolToBeRemoved: null
		});
		this.toggleBodyScroll();
	}

	onSearchInTagsChange = checked => {
		this.setState({ searchInTags: checked }, _ => {
			if (this.state.lastSearchText) {
				this.searchTool(this.state.lastSearchText);
			}
		});
	}

	openRemovalConfirmDialog = ({ id, title }) => {
		this.setState({
			toolToBeRemoved: {
				id,
				title
			},
			removeModalIsOpen: true
		});
		this.toggleBodyScroll();
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
			head:
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

		this.setState({ lastSearchText: text })
		this.setState({ tools });
	}

	toggleBodyScroll = _ => {
		this.setState({ bodyScrollEnabled: !this.state.bodyScrollEnabled }, _ => {
			document.body.style.overflowY =
				this.state.bodyScrollEnabled ? 'auto' : 'hidden';
		});
	}

	handleAddedTool = addedTool => {
		this.addToolsInState(addedTool);
		this.showNotification({
			className: 'green-bg',
			duration: 4000,
			head:
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
				.filter(ntf => ntf != notification)
		}));
	}

	render() {
		return (
			<div className="App">
				<TransitionGroup component={'section'} className="notification-container">
					{this.state.notifications.map((notification, index) =>
						<CSSTransition
							unmountOnExit
							timeout={notification.duration}
							classNames="slide-up" key={index}>
							<Notification {...notification} key={index} />
						</CSSTransition>
					)}
				</TransitionGroup>
				<div className="container">
					<Header
						searchTool={this.searchTool}
						onSearchInTagsChange={this.onSearchInTagsChange}
						onAddClick={_ => {
							this.setState({ addModalIsOpen: true });
							this.toggleBodyScroll();
						}}
					/>

					<button className={`button-float grow-gradient show-below-601px
						${this.state.showAddFloatBtn ? '' : 'button-float--hide'}`}
						onClick={_ => {
							this.setState({ addModalIsOpen: true });
							this.toggleBodyScroll();
						}}>

						<img className="button__icon" src="/plus.svg" alt="Add Icon" />
					</button>

					<section className="Tool-list">
						{
							this.state.tools && this.state.tools.length
								? <ToolList tools={this.state.tools}
									remove={this.openRemovalConfirmDialog}
									searchedTag={this.state.searchInTags ? this.state.lastSearchText.trim() : null} />
								: <Spinner />
						}
					</section>

					<NewToolModalContainer
						isOpen={this.state.addModalIsOpen}
						close={_ => {
							this.setState({ addModalIsOpen: false });
							this.toggleBodyScroll();
						}}
						handleAddedTool={this.handleAddedTool} />

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