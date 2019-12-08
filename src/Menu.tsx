import { observer } from 'mobx-react';
import React from 'react';

export interface MenuProps {
  filter: {
    expr: string;
    regexp: boolean;
  };
  source: {
    url: string;
  };
  root: {
    label: string;
  };
}

@observer
export class Menu extends React.Component<MenuProps> {
  render() {
    return <nav key='nav-menu'>
      <span>
        <label>Filter</label>
        <input type='text' value={this.props.filter.expr} onChange={(e) => this.onFilterChange(e)} />
      </span>
      <span>
        <label>Root Node</label>
        <input type='text' value={this.props.root.label} />
      </span>
      <span>
        <label>Source</label>
        <input type='text' value={this.props.source.url} onChange={(e) => this.onSourceChange(e)} />
      </span>
      <span>
        <button onClick={() => this.onLoad()}>Load</button>
      </span>
    </nav>;
  }

  onLoad() {
    console.log('load source', this.props.source);
  }

  onFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.filter.expr = e.target.value;
  }

  onSourceChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.source.url = e.target.value;
  }
}