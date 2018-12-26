import React from 'react';
import Plot from 'react-plotly.js';
import _ from 'lodash';
import FileInput from './FileInput';
import PlotButtons from './PlotButtons';
import Export from './Export';
import INITIAL_STATE from '../constants/INITIAL_STATE';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			partials: [],
			config: { output: {destination : './output'}},
			songInfo: {songName: '', inputFilePath: ''},
			plot: INITIAL_STATE.PLOT
		};

		this.setSongInfo = (_songInfo) => {
			this.setState({
				songInfo: _songInfo
			});
		};

		this.addPartials = (newPartials) => {	
			this.setState({
				partials: [...this.state.partials, ...newPartials]
			});
		};

		this.setPlot = (_data, _layout) => {
			this.setState({
				plot: {
					data: _data,
					layout: _layout
				}
			});

		};

		this.mergeConfig = (newConfig) => {
			this.setState({
				config: _.merge(this.state.config, newConfig)
			});
		};
	}
	
	render() {
		return (
			<div className="App">
				<FileInput addPartials={ this.addPartials } setSongInfo={ this.setSongInfo } songInfo={ this.state.songInfo } />
				<PlotButtons partials= {this.state.partials } setPlot={ this.setPlot } />
				<Plot
					data={ this.state.plot.data } layout={ this.state.plot.layout }
				/>
				<Export 
					partials={this.state.partials } 
					destination={ this.state.config.output.destination} 
					mergeConfig={ this.mergeConfig } 
					songInfo={ this.state.songInfo }
				/>
			</div>
		);
	}
}

export default App;