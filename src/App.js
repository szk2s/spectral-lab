import React, { Component } from 'react';
import './App.css';
import FileInput from './FileInput';

class App extends Component {
	state = {
		partials: [],
		melodies: [],
		smfs:[],
		config:{},
		songInfo:{}
	}
	render() {
		const fs = require('fs');
		return (
			<div className="App">
				<FileInput />
			</div>
		);
	}
}

export default App;
