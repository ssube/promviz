import { setOrAdd } from '../utils';

const NAME_SEP = '_';

export function splitName(name: string): Array<string> {
  return name.split(NAME_SEP);
}

export function baseName(name: string) {
  const parts = splitName(name);
  return parts.slice(0, parts.length - 1).join(NAME_SEP);
}

export function parentName(name: string, root: string) {
  if (name.includes(NAME_SEP)) {
    return baseName(name);
  }

  if (name === root) {
    return '';
  }

  return root;
}

export interface GraphData {
  labels: Array<string>;
  parents: Array<string>;
  values: Array<number>;
}

export function parseNames(names: Map<string, number>, rootLabel = 'root'): GraphData {
  let total = 0;
  const values = new Map<string, number>();
  for (const [name, weight] of names) {
    total += weight;
    setOrAdd(values, name, weight);

    const segments = splitName(name);
    for (let i = 0; i < segments.length; ++i) {
      const parts = segments.slice(0, i);
      setOrAdd(values, parts.join(NAME_SEP), weight);
    }
  }
  values.set(rootLabel, total);

  return {
    labels: Array.from(values.keys()),
    parents: Array.from(values.keys()).map((name) => parentName(name, rootLabel)),
    values: Array.from(values.values()),
  };
}

export type NameData = Array<{
  name: string;
  weight: number;
}>;

export type NameTuple = [string, number];

export function parseRaw(data: NameData): GraphData {
  const rawNames = Array.from(data).map((it) => [it.name, it.weight] as NameTuple);
  const rawData = new Map(rawNames);
  return parseNames(rawData);
}
