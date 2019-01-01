import React from 'react';
import s2m from 'spectrum2mpe';
import path from 'path';
import { remote } from 'electron';
import PropTypes from 'prop-types';
const { dialog, getGlobal } = remote;
const ProgressBar = getGlobal('ProgressBar');

const FileInput = ({ setPartials, setSongInfo, songInfo }) => {
  const handleClick = async () => {
    let paths = dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections', 'createDirectory'],
      filters: [
        {
          name: 'Text (SPEAR export format)',
          extensions: ['txt']
        },
        {
          name: 'CSV (MATLAB export format)',
          extensions: ['csv']
        }
      ]
    });

    if (paths == null) {
      // User canceled opening file
      return;
    }
    if (paths.length !== 1) {
      dialog.showMessageBox({
        type: 'error',
        message: 'Please select only one file'
      });
      paths = null;
      return handleClick();
    }
    const progressBar = new ProgressBar({
      text: 'Converting file...',
      detail: 'Wait...'
    });
    const newPartials = await s2m.txtImport(paths[0]);
    setPartials(newPartials);
    setSongInfo({
      songName: path.basename(paths[0], '.txt'),
      inputFilePath: paths[0]
    });
    progressBar.setCompleted();
  };

  const CurrentFileView = () => {
    if (songInfo.songName == '') {
      return (
        <p>
          <a onClick={handleClick}>Open your file</a>
        </p>
      );
    }
    return (
      <div>
        <p>Current File</p>
        <p className="song-name">{songInfo.songName}</p>
        <p className="inputDirName">
          {'( ' + path.dirname(songInfo.inputFilePath) + ' )'}
        </p>
      </div>
    );
  };

  return (
    <div>
      <CurrentFileView />
      <button className="open" onClick={handleClick}>
        Open
      </button>
    </div>
  );
};

FileInput.propTypes = {
  setSongInfo: PropTypes.func.isRequired,
  setPartials: PropTypes.func.isRequired,
  songInfo: PropTypes.PropTypes.shape({
    songName: PropTypes.string
  })
};

export default FileInput;
