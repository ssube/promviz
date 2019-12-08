import { isNil, startsWith, unzip, zip, sum } from 'lodash';
import { observer } from 'mobx-react';
import { PlotMouseEvent } from 'plotly.js';
import React from 'react';
import Plot, { PlotParams } from 'react-plotly.js';

import { MenuProps } from '../Menu';

export interface ClusterGraphProps {
  data: {
    labels: Array<string>;
    parents: Array<string>;
    values: Array<number>;
  }
  menu: MenuProps;
}

@observer
export class ClusterGraph extends React.Component<ClusterGraphProps> {
  render() {
    const filter = this.props.menu.filter.expr;

    const triwise = zip(this.props.data.labels, this.props.data.parents, this.props.data.values);
    const needed = triwise.filter(([label]) => startsWith(label, filter));
    needed.push(['root', '', sum(needed)]);

    const [labels, parents, values] = unzip(needed);
    const filteredGraph = {
      labels,
      parents,
      values,
    };

    const plops: PlotParams = {
      config: {
        fillFrame: true,
        responsive: true,
        scrollZoom: true,
      },
      data: [{
        ...filteredGraph,
        branchvalues: 'total',
        type: 'sunburst',
      } as any],
      layout: {
        autosize: true,
      },
      onClick: (e) => this.onClick(e),
      useResizeHandler: true,
    };

    return <Plot {...plops} />;
  }

  onClick(e: Readonly<PlotMouseEvent>) {
    console.log('click', e);
    const [p] = e.points;
    const {label} = p as any;
    if (!isNil(label)) {
      this.props.menu.root.label = label.toString();
    }
  }
}