export default { 
	data: [
		{
			x: [],
			y: [],
			z: [],
			type: 'scatter3d',
			mode: 'lines',
		},
	], 
	layout: {
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
	}
};
