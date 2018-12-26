import React from 'react';
import s2m from 'spectrum2mpe';
import moment from 'moment';
import path from 'path';
import { remote } from 'electron';
const { dialog } = remote;

const Export = ({ partials, destination, mergeConfig }) => {
	const changeDestination = () => {
		let paths = dialog.showOpenDialog({
			properties: ['openDirectory', 'createDirectory']
		});
		
		if(paths){
			mergeConfig( { output: { destination: paths[0] } } );
		}
	};
	
	const exportSMFs = async (partials) => {
		const melodies = await s2m.partials2melodies(partials);
		const smfs = await s2m.genSMFs(melodies, 'test-song');
		await s2m.smfsBatchExport(
			smfs, 
			'large_bowl', 
			destination, 
			{
				makeOutputFolder: true,
				outputFolderName: moment(new Date()).format('YYMMDD')
			}
		);
		console.log('Completed!');
	};

	return (
		<div className="export">
			<h3>Export</h3>
			<div className="path-selector">
				<p>Path</p>
				<p className="path">
					{ path.resolve(destination) } 
					<button onClick={ changeDestination }>Change</button>
				</p>
			</div>
			<button onClick={ () => { exportSMFs(partials); } }>Export</button>
		</div>
	);
};

export default Export;