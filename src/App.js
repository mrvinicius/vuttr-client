import React, { Component } from 'react';

import { getAllTools } from './server-api';
import ToolList from './tool-list/Tool-list';
import Spinner from './spinner/Spinner';
import NewToolModalContainer from './new-tool-modal/New-tool-modal.container';

class App extends Component {
	state = {
		tools: [],
		addModalIsOpen: false
	}

	constructor(params) {
		super(params);
		this.updateToolList = this.updateToolList.bind(this);
	}

	async componentDidMount() {
		const tools = await getAllTools();
		this.updateToolList(tools);
	}

	updateToolList(tools) {
		this.setState(prevState => ({ tools: [...prevState.tools, ...tools] }));
	}

	render() {
		return (
			<div className="App">
				<h1>VUTTR</h1>
				<h2>Very Useful Tools to Remember</h2>
				<button onClick={_ => this.setState({ addModalIsOpen: true })}>Add</button>
				{
					this.state.tools && this.state.tools.length
						? <ToolList tools={this.state.tools} />
						: <Spinner />
				}
				<NewToolModalContainer
					isOpen={this.state.addModalIsOpen}
					close={_ => this.setState({ addModalIsOpen: false })}
					updateToolList={this.updateToolList} />
			</div>
		);
	}
}

export default App;