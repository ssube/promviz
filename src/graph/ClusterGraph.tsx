import React from 'react';
import Plot from 'react-plotly.js';







export class ClusterGraph extends React.Component {
  render() {
    return <Plot
      data={[
        {
          x: [1, 2, 3],
          y: [1, 2, 3],
          type: 'scatter',
          mode: 'markers',
          marker: {
            color: 'red',
          }
        },
      ]}
      layout={ {
        width: 512,
        height: 512,
        title: 'Example Graph',
      } }
    />;
  }
}