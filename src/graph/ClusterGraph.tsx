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
      config={{
        fillFrame: true,
        responsive: true,
        scrollZoom: true,
      }}
      data={[
        {
          branchvalues: 'total',
          labels: this.props.data.labels,
          parents: this.props.data.parents,
          type: 'sunburst',
          values: this.props.data.values,
          /* eslint-disable-next-line */
        } as any,
      ]}
      layout={ {
        autosize: true,
      } }
      useResizeHandler={true}
    />;
  }
}