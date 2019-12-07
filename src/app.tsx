import React from 'react';
import ReactDOM from 'react-dom';

import { ClusterGraph } from './graph/ClusterGraph';

const STATUS_SUCCESS = 0;

const GRAPH_SIZE = 512;
const GRAPH_CENTER = 256;
const NODE_SIZE = 64;
const NODE_STRENGTH = -5;

export async function main(args: ReadonlyArray<string>): Promise<number> {
  const rawData = /* readFile */ '';
  ReactDOM.render(<ClusterGraph />, document.getElementById('graph-container'));

  return STATUS_SUCCESS;
}
