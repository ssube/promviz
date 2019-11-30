import { forceCenter, forceCollide, forceManyBody, forceSimulation, hierarchy, select } from 'd3';

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

const GRAPH_SIZE = 512;
const GRAPH_CENTER = 256;
const NODE_SIZE = 64;

export async function main(args: ReadonlyArray<string>): Promise<number> {
  const rawData = /* readFile */ '';
  const graphData = compileGraph(rawData);
  const nodes = graphData.descendants();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const svg = select('#d3-box')
    .append('svg')
    .attr('width', GRAPH_SIZE)
    .attr('height', GRAPH_SIZE);

  const forceGraph = forceSimulation<{}>(nodes)
    .force('charge', forceManyBody())
    .force('center', forceCenter(GRAPH_SIZE / 2, GRAPH_SIZE / 2))
    .force('collision', forceCollide().radius((d: any) => d.radius))
    .on('tick', () => {
      const u = svg.selectAll('g').data(nodes);
      const e = u.enter()
        .append('g')
        .merge(u as any)
        .attr('transform', (d: any) => `translate(${d.x}, ${d.y})`);

      e.append('circle')
        .attr('r', NODE_SIZE)
        .style('fill', 'gray')
        .style('stroke', 'white');

      e.append('text')
        .text((d: any) => d.data.name);

      u.exit().remove();
    });

  /* eslint-disable-next-line no-console */
  console.log(forceGraph);
  return STATUS_SUCCESS;
}
