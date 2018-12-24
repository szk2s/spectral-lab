import React from 'react';
import s2m from 'spectrum2mpe';
import moment from 'moment';

const ExportButton = ({ partials }) => {
	const exportSMFs = async (partials) => {
		const melodies = await s2m.partials2melodies(partials);
		const smfs = await s2m.genSMFs(melodies, 'test-song');
		await s2m.smfsBatchExport(
			smfs, 
			'large_bowl', 
			'./output', 
			{
				makeOutputFolder: true,
				outputFolderName: moment(new Date()).format('YYMMDD')
			}
		);
		console.log('Completed!');
	};

	return (
		<div className="exportButtons">
			<button onClick={ () => { exportSMFs(partials); } }>Export</button>
		</div>
	);
};

export default ExportButton;