import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';

import { GraphData, parseNames } from './graph';
import { ClusterGraph } from './graph/ClusterGraph';
import { Menu, MenuProps } from './Menu';
import dataFile from './resource/names.json';
import { VERSION_INFO } from './version';

const STATUS_SUCCESS = 0;

type NameData = Array<{
  name: string;
  weight: number;
}>;
type NameTuple = [string, number];

export async function main(args: ReadonlyArray<string>): Promise<number> {
  const rawNames = Array.from(dataFile as NameData).map((it) => [it.name, it.weight] as NameTuple);
  const rawData = new Map(rawNames);
  const graphData = parseNames(rawData);

  const state = observable({
    graphData,
    menuOptions: {
      filter: {
        expr: '',
        regexp: false,
      },
      source: {
        url: 'staging',
      },
    },
  });

  ReactDOM.render(<App
    key='app'
    graph={state.graphData}
    menu={state.menuOptions}
  >
  </App>, document.getElementById('app-container'));

  return STATUS_SUCCESS;
}

interface AppProps {
  graph: GraphData;
  menu: MenuProps;
}

@observer
export class App extends React.Component<AppProps> {
  render() {
    return <section>
      <header>
        { VERSION_INFO.package.name } - { VERSION_INFO.package.version }
      </header>
      <Menu {...this.props.menu} />
      <section key='graph-section'>
        <div id='graph-container' key='graph-container'>
          <ClusterGraph
            data={this.props.graph}
            key='metrics-graph'
            menu={this.props.menu}
          />
          { this.props.children }
        </div>
      </section>
      <footer>
        { VERSION_INFO.git.branch } - { VERSION_INFO.git.commit }
      </footer>
    </section>;
  }
}