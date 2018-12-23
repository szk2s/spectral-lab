import React from 'react';
import FileInput from './FileInput';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			partials: [],
			melodies: [],
			smfs:[],
			config:{},
			songInfo:{}
		};

		this.addPartials = (newPartials) => {	
			this.setState({
				partials: [...this.state.partials, ...newPartials]
			});
		};
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