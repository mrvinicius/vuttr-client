import React, { Component } from 'react';
import axios from 'axios';

import ToolList from './tool-list/Tool-list';
import Spinner from './spinner/Spinner';

axios.defaults.baseURL = 'http://localhost:3000';

class App extends Component {
	state = {
		tools: []
	}

	async componentDidMount() {
		const tools = await getAllTools();
		this.setState({ tools });
	}	
		
	render() {
		return (
			<div className="App">
				<h1>VUTTR</h1>
				<h2>Very Useful Tools to Remember</h2>
				{
					this.state.tools && this.state.tools.length
					? <ToolList tools={this.state.tools} />
					: <Spinner />
				}
			</div>
		);
	}
}

function wait(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getAllTools() {
	const response = await axios.get('/tools');
	await wait(1000);
	console.log(response.data);
	return response.data;
}

export default App;
