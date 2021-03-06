import { cloneDeep } from 'lodash';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';

import { GraphData, NameData, parseRaw } from './graph';
import { ClusterGraph } from './graph/ClusterGraph';
import { Menu, MENU_DEFAULTS, MenuData } from './menu';
import EXAMPLE_DATA from './resource/names.json';
import { VERSION_INFO } from './version';

const STATUS_SUCCESS = 0;

export async function main(args: ReadonlyArray<string>): Promise<number> {
  const graph = parseRaw(EXAMPLE_DATA as NameData);
  const state = observable({
    graph,
    menu: cloneDeep(MENU_DEFAULTS),
  });

  ReactDOM.render(<App
    key='app'
    graph={state.graph}
    menu={state.menu}
  />, document.getElementById('app-container'));

  return STATUS_SUCCESS;
}

interface AppProps {
  graph: GraphData;
  menu: MenuData;
}

@observer
export class App extends React.Component<AppProps> {
  render() {
    return <section>
      <header>
        {VERSION_INFO.package.name} - {VERSION_INFO.package.version}
      </header>
      <Menu
        {...this.props.menu}
        onLoad={(e) => this.onLoad(e)}
      />
      <section key='graph-section'>
        <div id='graph-container' key='graph-container'>
          <ClusterGraph
            data={this.props.graph}
            key='metrics-graph'
            menu={this.props.menu}
          />
          {this.props.children}
        </div>
      </section>
      <footer>
        {VERSION_INFO.git.branch} - {VERSION_INFO.git.commit}
      </footer>
    </section>;
  }

  onLoad(data: GraphData) {
    this.props.graph.labels = data.labels;
    this.props.graph.parents = data.parents;
    this.props.graph.values = data.values;
  }
}