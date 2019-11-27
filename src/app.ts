import d3 from 'd3';

const STATUS_SUCCESS = 0;

function compileGraph(rawData: string) {
  const parsed = {
    name: 'root',
    children: [{
      name: 'node',
      value: 4,
    }],
  };
  return d3.hierarchy(parsed);
}

export async function main(args: ReadonlyArray<string>): Promise<number> {
  const rawData = /* readFile */ '';
  const graphData = compileGraph(rawData);
  const nodes = graphData.descendants();
  const forceGraph = d3.forceSimulation<{}>(nodes);
  console.log(forceGraph);
  return STATUS_SUCCESS;
}
