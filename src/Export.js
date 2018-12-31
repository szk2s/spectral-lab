import React from 'react';
import PropTypes from 'prop-types';
import s2m from 'spectrum2mpe';
import moment from 'moment';
import path from 'path';
import { remote } from 'electron';
const { dialog, getGlobal } = remote;
const ProgressBar = getGlobal('ProgressBar');

const Export = ({ partials, destination, mergeConfig, songInfo }) => {
  const changeDestination = () => {
    let paths = dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory']
    });

    if (paths) {
      mergeConfig({
        output: { destination: paths[0] }
      });
    }
  };

  const exportSMFs = async (partials) => {
    if (!partials || partials.length < 1) {
      dialog.showMessageBox({
        type: 'error',
        message: 'No partials to export'
      });
      return;
    }

    if (destination == '') {
      dialog.showMessageBox({
        type: 'error',
        message: 'Please select output path'
      });
    }

    const progressBar = new ProgressBar({
      text: 'Exporting data...',
      detail: 'Wait...'
    });

    const melodies = await s2m.partials2melodies(partials);
    const smfs = await s2m.genSMFs(melodies, 'test-song');
    if (smfs.length > 1) {
      await s2m.smfsBatchExport(smfs, songInfo.songName, destination, {
        makeOutputFolder: true,
        outputFolderName:
          songInfo.songName + '_' + moment(new Date()).format('YYMMDD')
      });
    } else if (smfs.length === 1) {
      await s2m.smfsBatchExport(smfs, songInfo.songName, destination, {
        makeOutputFolder: false
      });
    }

    progressBar.setCompleted();
    dialog.showMessageBox({ message: 'Export Completed!' });
  };

  return (
    <div className="export">
      <h3>Export</h3>
      <p>Path</p>
      <p className="path-display">
        {path.resolve(destination)}
        <button onClick={changeDestination}>Change</button>
      </p>
      <button
        onClick={() => {
          exportSMFs(partials);
        }}
      >
        Export
      </button>
    </div>
  );
};

Export.propTypes = {
  partials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      numFrames: PropTypes.number,
      startTime: PropTypes.number,
      endTime: PropTypes.number,
      timecode: PropTypes.arrayOf(PropTypes.number),
      freqs: PropTypes.arrayOf(PropTypes.number),
      amps: PropTypes.arrayOf(PropTypes.number)
    })
  ).isRequired,
  destination: PropTypes.string.isRequired,
  mergeConfig: PropTypes.func.isRequired,
  songInfo: PropTypes.PropTypes.shape({
    songName: PropTypes.string
  })
};

export default Export;
