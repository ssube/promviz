import { observer } from 'mobx-react';
import React from 'react';

import { GraphData, parseNames, parseRaw, NameData } from './graph';
import EXAMPLE_DATA from './resource/names.json';

export interface MenuData {
  chart: {
    depth: number;
  };
  filter: {
    expr: string;
    regexp: boolean;
  };
  source: {
    url: string;
  };
}

export interface MenuProps extends MenuData {
  onLoad: (data: GraphData) => void;
}

@observer
export class Menu extends React.Component<MenuProps> {
  render() {
    return <nav key='nav-menu'>
      <section>
        <label htmlFor='chart-depth'>Depth</label>
        <input
          name='chart-depth'
          type='number'
          min={0}
          max={6}
          value={this.props.chart.depth}
          onChange={(e) => this.onChartDepth(e)}
        />
      </section>
      <section>
        <label htmlFor='filter-expr'>Filter</label>
        <input
          name='filter-expr'
          type='text'
          value={this.props.filter.expr}
          onChange={(e) => this.onFilterChange(e)}
        />
        <label htmlFor='filter-regexp'>RegExp</label>
        <input
          name='filter-regexp'
          type='checkbox'
          checked={this.props.filter.regexp}
          onChange={(e) => this.onFilterFlag(e)}
        />
      </section>
      <section>
        <label htmlFor='source-url'>Source</label>
        <input
          name='source-url'
          type='text'
          value={this.props.source.url}
          onChange={(e) => this.onSourceChange(e)}
        />
        <button onClick={() => this.onLoad()}>Load</button>
      </section>
    </nav>;
  }

  async loadData(url: string): Promise<GraphData> {
    if (url === 'example') {
      return parseRaw(EXAMPLE_DATA as NameData);
    } else {
      const resp = await fetch(url);
      const data = await resp.json();
      return parseRaw(data as NameData);
    }
  }

  async onLoad() {
    console.log('load source', this.props.source);
    const url = this.props.source.url;
    const data = await this.loadData(url);
    this.props.onLoad(data);
  }

  onFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.filter.expr = e.target.value;
  }

  onFilterFlag(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.filter.regexp = e.target.checked;
  }

  onSourceChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.source.url = e.target.value;
  }

  onChartDepth(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.chart.depth = e.target.valueAsNumber;
  }
}