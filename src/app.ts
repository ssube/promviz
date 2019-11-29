import { forceSimulation, hierarchy, select } from 'd3';

const STATUS_SUCCESS = 0;

function compileGraph(rawData: string) {
  const parsed = {
    children: [{
      name: 'node',
      value: 4,
    }],
    name: 'root',
  };
  return hierarchy(parsed);
}

export async function main(args: ReadonlyArray<string>): Promise<number> {
  const rawData = /* readFile */ '';
  const graphData = compileGraph(rawData);
  const nodes = graphData.descendants();
  const forceGraph = forceSimulation<{}>(nodes);
  const svg = select('svg');
  svg.data(nodes);

  /* eslint-disable-next-line no-console */
  console.log(forceGraph);
  return STATUS_SUCCESS;
}
