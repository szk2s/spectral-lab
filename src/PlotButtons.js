import React from 'react';

const PlotButtons = ({ partials, setPlot }) => {
	const partialsPlotData = partials.map(partial => {
		return {
			type: 'scatter3d',
			mode: 'lines',
			x: partial.timecode,
			y: partial.freqs,
			z: partial.amps, 
			opacity: 1,
			line: {
				width: 0.5,
				reversescale: false
			}
		};
	});

	const layout = {
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


	return (
		<div className="plotButtons">
			<p>
				<button onClick={ () => { setPlot(partialsPlotData, layout); } }>Make Graph</button>
			</p>
		</div>
	);
};

export default PlotButtons;

	