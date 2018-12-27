import React from 'react';
import Plot from 'react-plotly.js';
import _ from 'lodash';
import FileInput from './FileInput';
import StyleSelector from './StyleSelector';
import Export from './Export';
import INITIAL_STATE from '../constants/INITIAL_STATE';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			partials: [],
			config: { output: {destination : './output'}},
			songInfo: {songName: '', inputFilePath: ''},
			plotStyle: 'none',
			plotContent: {...INITIAL_STATE.PLOT}
		};

		this.componentDidUpdate = (_, prevState) => {
			if (this.state.songInfo.inputFilePath !== prevState.songInfo.inputFilePath){
				this.setPlotStyle('none');
			} 

			if (this.state.plotStyle !== prevState.plotStyle){
				this.updateGraph();
			}
		};

		this.setSongInfo = (_songInfo) => {
			this.setState({
				songInfo: _songInfo
			});
		};

		this.setPartials = (newPartials) => {	
			this.setState({
				partials: newPartials
			});
		};

		this.setPlotStyle = ( newStyle ) => {
			this.setState({
				plotStyle: newStyle
			});
		};

		this.setPlotContent = ( newContent ) => {
			this.setState({
				plotContent: newContent
			});
		};

		this.mergeConfig = (newConfig) => {
			this.setState({
				config: _.merge(this.state.config, newConfig)
			});
		};

		this.updateGraph = () => {
			const partials = this.state.partials;
			if( this.state.plotStyle == 'none' ){
				this.setPlotContent( INITIAL_STATE.PLOT );
			} else if ( this.state.plotStyle == '2d' ){
				const data = partials.map(partial => {
					return {
						type: 'scatter',
						mode: 'lines+markers',
						x: partial.timecode,
						y: partial.freqs,
						line: {
							width: 0.5,
							reversescale: false
						},
						marker: {
							size: 1.5,
							color: partial.amps.map(amp => amp * 300)
						}
					};
				});
		
				const layout = {
					autosize: true,
					xaxis: {
						title: 'Time'
					},
					yaxis: {
						title: 'Frequency'
					}
				};
				
				this.setPlotContent( { data: data, layout: layout } );
			} else if ( this.state.plotStyle == '3d' ){
				const data = partials.map(partial => {
					return {
						type: 'scatter3d',
						mode: 'lines+markers',
						x: partial.timecode,
						y: partial.freqs,
						z: partial.amps,
						line: {
							width: 0.5,
							reversescale: false
						},
						marker: {
							size: 1.5,
							color: partial.amps.map(amp => amp * 200)
						}
					};
				});
		
				const layout = {
					autosize: true,
					xaxis: {
						title: 'Time'
					},
					yaxis: {
						title: 'Frequency'
					},
					zaxis: {
						title: 'Amplitude'
					}
				};
				this.setPlotContent( { data: data, layout: layout } );
			}
		};
	}
	
	render() {
		return (
			<div className='App'>
				<FileInput 
					setPartials={ this.setPartials } 
					setSongInfo={ this.setSongInfo } 
					songInfo={ this.state.songInfo } 
				/>
				<StyleSelector 
					partials={this.state.partials } 
					plotStyle={this.state.plotStyle} 
					setPlotStyle={ this.setPlotStyle } 
				/>
				<Plot
					className='Plot'
					data={ this.state.plotContent.data } 
					layout={ this.state.plotContent.layout } 
					config={ this.state.plotContent.config } 
					useResizeHandler= { true } 
					style={ { width: '100%', height: '100%' } } 
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