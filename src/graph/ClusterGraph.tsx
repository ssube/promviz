import React from 'react';
import Plot from 'react-plotly.js';



export interface ClusterGraphProps {
  data: {
    labels: Array<string>;
    parents: Array<string>;
    values: Array<number>;
  }
}

export class ClusterGraph extends React.Component<ClusterGraphProps> {
  render() {
    return <Plot
      data={[
        {
          labels: this.props.data.labels,
          parents: this.props.data.parents,
          /* eslint-disable-next-line */
          type: 'sunburst' as any,
          values: this.props.data.values,
        },
      ]}
      layout={ {
        width: 1800,
        height: 1000,
        title: 'Metric Names',
      } }
    />;
  }
}