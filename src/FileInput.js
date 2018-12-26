import React from 'react';
import s2m from 'spectrum2mpe';
import path from 'path';
import { remote } from 'electron';
const { dialog } = remote;

const FileInput = ({ addPartials, setSongInfo, songInfo }) => { 
	const handleClick = async () => {
		let paths = dialog.showOpenDialog({
			properties: ['openFile', 'multiSelections', 'createDirectory'],
			filters: [
				{ name: 'Text (SPEAR export format)', extensions: ['txt'] },
				{ name: 'CSV (MATLAB export format)', extensions: ['csv'] },
			]
		});
		
		if(paths){
			if(paths.length > 1){
				dialog.showMessageBox({ type:'error', message: 'Please select only one file' });
				paths = undefined;
				return handleClick();
			}
			const newPartials = await s2m.txtImport(paths[0]);
			addPartials(newPartials);
			setSongInfo({songName: path.basename( paths[0], '.txt'), inputFilePath: paths[0]});
			console.log('Your file has been successfully imported!');
		} else {
			return;
		}
	};

	const CurrentFileView = () => {
		if(!songInfo.songName){
			return (
				<p>
					<a onClick={ handleClick }>Open your file</a>
				</p>
			);
		}else{
			return (
				<div>
					<p>Current File</p>
					<div> { path.dirname(songInfo.inputFilePath)} </div>
				</div>	
			);
		}
		
	};
	
	return (
		<div>
			<button className="open" onClick={ handleClick }>Open</button>
			<CurrentFileView />
		</div>
	);
};



export default FileInput;