import React from 'react';

export interface MenuProps {
  env: string;
  root: string;
  filter: string;
}

export class Menu extends React.Component<MenuProps> {
  render() {
    return <nav key='nav-menu'>
      <span>
        <label>Environment</label>
        <input type='text' value={this.props.env} />
      </span>
      <span>
        <label>Filter</label>
        <input type='text' value={this.props.filter} />
      </span>
      <span>
        <label>Root Node</label>
        <input type='text' value={this.props.root} />
      </span>
    </nav>;
  }
}