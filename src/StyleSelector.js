import React from 'react';
import { remote } from 'electron';
const { dialog } = remote;

class StyleSelector extends React.Component {
	constructor(props) {
		super(props);

		this.handleChange = (event) => {
			if (this.props.partials.length == 0) {
				dialog.showMessageBox({ type:'error', message: 'Open your file before making graph' });
				return;
			}
			this.props.setPlotStyle( event.target.value );
		};		
	}

	render(){
		return (
			<div className="plotButtons">
				<p>
					Graph
					<select value={ this.props.plotStyle } onChange={ this.handleChange }>
						<option value="none">None</option>
						<option value="2d">2D Graph</option>
						<option value="3d">3D Graph</option>
					</select>
				</p>
			</div>
		);
	}
}

export default StyleSelector;

	