import { isNil } from 'lodash';
import { PlotMouseEvent, PlotSelectionEvent, ButtonClickEvent, LegendClickEvent } from 'plotly.js';
import React from 'react';
import Plot, { PlotParams, Figure } from 'react-plotly.js';

import { MenuProps } from '../Menu';

export interface ClusterGraphProps {
  data: {
    labels: Array<string>;
    parents: Array<string>;
    values: Array<number>;
  }
  menu: MenuProps;
}

export class ClusterGraph extends React.Component<ClusterGraphProps> {
  render() {
    const plops: PlotParams = {
      config: {
        fillFrame: true,
        responsive: true,
        scrollZoom: true,
      },
      data: [{
        branchvalues: 'total',
        labels: this.props.data.labels,
        parents: this.props.data.parents,
        type: 'sunburst',
        values: this.props.data.values,
      } as any],
      layout: {
        autosize: true,
      },
      onButtonClicked: (e) => this.onButton(e),
      onClick: (e) => this.onClick(e),
      onUpdate: (e) => this.onUpdate(e),
      onSelecting: (e) => this.onSelect(e),
      onLegendClick: (e: Readonly<LegendClickEvent>) => {
        console.log('legend click');
        return true;
      },
      useResizeHandler: true,
    };

    /* eslint-disable-next-line */
    (plops as any).selectedPath = [this.props.menu.root];

    return <Plot {...plops} />;
  }

  onButton(e: Readonly<ButtonClickEvent>) {
    console.log('button', e);
  }

  onClick(e: Readonly<PlotMouseEvent>) {
    console.log('graph click', e);
    const [p] = e.points;
    const [label] = p.data.labels;
    if (!isNil(label)) {
      this.props.menu.filter = label.toString();
    }
  }

  onSelected(e: Readonly<PlotSelectionEvent>) {
    console.log('selected', e);
  }

  onSelect(e: Readonly<PlotSelectionEvent>) {
    console.log('selecting', e);
  }

  onUpdate(e: Readonly<Figure>) {
    console.log('update', e);
  }
}