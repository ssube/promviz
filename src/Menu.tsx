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

  onLoad() {
    console.log('load source', this.props.source);
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
}