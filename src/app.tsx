import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';

import { parseNames } from './graph';
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
      env: 'staging',
      filter: '',
      root: 'root',
    },
  });

  ReactDOM.render(<App
    key='app'
    menu={state.menuOptions}
  >
    <ClusterGraph
      data={state.graphData}
      key='metrics-graph'
      menu={state.menuOptions}
    />
  </App>, document.getElementById('app-container'));

  setInterval(() => {
    state.menuOptions.filter = Math.random().toString();
  }, 5000);

  return STATUS_SUCCESS;
}

interface AppProps {
  menu: MenuProps;
}

@observer
export class App extends React.Component<AppProps> {
  render() {
    return <section>
      <header>
        Prometheus Visualizer
      </header>
      <Menu env={this.props.menu.env} filter={this.props.menu.filter} root={this.props.menu.root} />
      <section key='graph-section'>
        <div id='graph-container' key='graph-container'>
          { this.props.children }
        </div>
      </section>
      <footer>
        Prometheus Visualizer { VERSION_INFO.git.commit }
      </footer>
    </section>;
  }
}