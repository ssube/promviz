import React from 'react';
import ReactDOM from 'react-dom';

import { parseNames } from './graph';
import { ClusterGraph } from './graph/ClusterGraph';
import dataFile from './resource/names.json';

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
  ReactDOM.render(<ClusterGraph 
    data={graphData}
  />, document.getElementById('graph-container'));

  return STATUS_SUCCESS;
}
