import React from 'react';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';

class SocketSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      port: 1111,
      socket: {}
    };
    this.handleChangeOnOff = (event) => {
      if (event.target.value === 'on') {
        const socket = openSocket('http://localhost:' + this.state.port);
        this.setState({ socket });
        socket.on('plot', (plotContent) => {
          this.props.setPlotContent(plotContent);
        });
        socket.on('partials', (partials) => {
          this.props.setPlotStyle('2d');
          this.props.setPartials(partials);
          this.props.updateGraph();
        });
      }
      if (event.target.value === 'off') {
        const socket = this.state.socket;
        socket.disconnect(true);
      }
    };
    this.handleChangePort = (event) => {
      const port = Number(event.target.value);
      this.setState({ port });
    };
  }

  render() {
    return (
      <div className="SocketSwitch">
        <p>
          Socket:
          <select onChange={this.handleChangeOnOff}>
            <option value="off">Off</option>
            <option value="on">On</option>
          </select>
          Port:
          <input type="number" max="9999" value={this.state.port} onChange={this.handleChangePort} />
        </p>
      </div>
    );
  }
}

SocketSwitch.propTypes = {
  setPlotStyle: PropTypes.func.isRequired,
  setPlotContent: PropTypes.func.isRequired,
  setPartials: PropTypes.func.isRequired,
  updateGraph: PropTypes.func.isRequired
};

export default SocketSwitch;
