import React from 'react';
import Plot from 'react-plotly.js';
import FileInput from './FileInput';
import PlotButtons from './PlotButtons';
import ExportButton from './ExportButton';
import INITIAL_STATE from '../constants/INITIAL_STATE';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			partials: [],
			config: {},
			songInfo: {},
			plot: INITIAL_STATE.PLOT
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
	}
	
	render() {
		return (
			<div className="App">
				<FileInput addPartials={ this.addPartials } />
				<PlotButtons partials= {this.state.partials } setPlot={ this.setPlot } />
				<Plot
					data={ this.state.plot.data } layout={ this.state.plot.layout }
				/>
				<ExportButton partials= {this.state.partials } />
			</div>
		);
	}
}

export default App;