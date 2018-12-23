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

	addPartials(newPartials) {	
		const _partials = [...this.partials, ...newPartials];
		this.setState({
			partials: _partials
		})
	}
	render() {
		return (
			<div className="App">
				<FileInput addPartials={ this.addPartials } />
			</div>
		);
	}
}

export default App;
