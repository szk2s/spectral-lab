import React from 'react';
import Plot from 'react-plotly.js';
import _ from 'lodash';
import FileInput from './FileInput';
import StyleSelector from './StyleSelector';
import Export from './Export';
import INITIAL_STATE from '../constants/INITIAL_STATE';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      partials: [],
      config: { output: { destination: '' } },
      songInfo: { songName: '', inputFilePath: '' },
      plotStyle: 'none',
      plotContent: { ...INITIAL_STATE.PLOT }
    };

    this.componentDidUpdate = (_, prevState) => {
      if (this.state.songInfo.inputFilePath !== prevState.songInfo.inputFilePath) {
        this.setPlotStyle('none');
      }

      if (this.state.plotStyle !== prevState.plotStyle) {
        this.updateGraph();
      }
    };

    this.setSongInfo = (songInfo) => {
      this.setState({
        songInfo
      });
    };

    this.setPartials = (partials) => {
      this.setState({
        partials
      });
    };

    this.setPlotStyle = (plotStyle) => {
      this.setState({
        plotStyle
      });
    };

    this.setPlotContent = (plotContent) => {
      this.setState({
        plotContent
      });
    };

    this.mergeConfig = (newConfig) => {
      this.setState({
        config: _.merge(this.state.config, newConfig)
      });
    };

    this.updateGraph = () => {
      const partials = this.state.partials;
      if (this.state.plotStyle == 'none') {
        this.setPlotContent(INITIAL_STATE.PLOT);
      } else if (this.state.plotStyle == '2d') {
        const data = partials.map((partial) => {
          return {
            type: 'scatter',
            mode: 'lines+markers',
            x: partial.timecode,
            y: partial.freqs,
            line: {
              width: 0.5,
              reversescale: false
            },
            marker: {
              size: 1.5,
              color: partial.amps.map((amp) => amp * 300)
            }
          };
        });

        const layout = {
          autosize: true,
          xaxis: {
            title: 'Time'
          },
          yaxis: {
            title: 'Frequency'
          }
        };

        this.setPlotContent({
          data: data,
          layout: layout
        });
      } else if (this.state.plotStyle == '3d') {
        const data = partials.map((partial) => {
          return {
            type: 'scatter3d',
            mode: 'lines+markers',
            x: partial.timecode,
            y: partial.freqs,
            z: partial.amps,
            line: {
              width: 0.5,
              reversescale: false
            },
            marker: {
              size: 1.5,
              color: partial.amps.map((amp) => amp * 200)
            }
          };
        });

        const layout = {
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
        };
        this.setPlotContent({
          data: data,
          layout: layout
        });
      }
    };
  }

  render() {
    const { partials, plotStyle, songInfo, plotContent, config } = this.state;
    return (
      <div className="App">
        <FileInput
          style={{ flex: 1 }}
          setPartials={this.setPartials}
          setSongInfo={this.setSongInfo}
          songInfo={songInfo}
        />
        <StyleSelector style={{ flex: 1 }} partials={partials} plotStyle={plotStyle} setPlotStyle={this.setPlotStyle} />
        <Plot
          style={{ flex: 100 }}
          className="Plot"
          data={plotContent.data}
          layout={plotContent.layout}
          config={plotContent.config}
          useResizeHandler={true}
        />
        <Export
          style={{ flex: 1 }}
          partials={partials}
          destination={config.output.destination}
          mergeConfig={this.mergeConfig}
          songInfo={songInfo}
        />
      </div>
    );
  }
}

export default App;
