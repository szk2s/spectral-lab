import React, { Component } from 'react';
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
		return (
			<div className="App">
				<FileInput />
			</div>
		);
	}
}

export default App;
