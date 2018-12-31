import React from 'react';
import { remote } from 'electron';
const { dialog } = remote;
import PropTypes from 'prop-types';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = (event) => {
      const partials = this.props.partials;
      if (!partials || partials.length < 1) {
        dialog.showMessageBox({
          type: 'error',
          message: 'No partials to plot'
        });
        return;
      }
      this.props.setPlotStyle(event.target.value);
    };
  }

  render() {
    return (
      <div className="plotButtons">
        <p>
          Graph:
          <select value={this.props.plotStyle} onChange={this.handleChange}>
            <option value="none">None</option>
            <option value="2d">2D Graph</option>
            <option value="3d">3D Graph</option>
          </select>
        </p>
      </div>
    );
  }
}

StyleSelector.propTypes = {
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
  setPlotStyle: PropTypes.func.isRequired,
  plotStyle: PropTypes.string.isRequired
};

export default StyleSelector;
