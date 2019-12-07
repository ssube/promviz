import { isNil, defaultTo } from 'lodash';

function setOrAdd(m: Map<string, number>, k: string, v: number) {
  if (m.has(k)) {
    const pv = m.get(k);
    if (isNil(pv)) {
      m.set(k, v);
    } else {
      m.set(k, pv + v);
    }
  } else {
    m.set(k, v);
  }
}

const NAME_SEP = '_';

function splitName(name: string): Array<string> {
  return name.split(NAME_SEP);
}

function baseName(name: string) {
  const parts = splitName(name);
  return parts.slice(0, parts.length - 1).join(NAME_SEP);
}

function defaultName(name: string, root: string) {
  if (name.includes(NAME_SEP)) {
    return baseName(name);
  }

  if (name === root) {
    return '';
  }

  return root;
}

export function parseNames(names: Map<string, number>, rootLabel = 'root') {
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
    parents: Array.from(values.keys()).map((name) => defaultName(name, rootLabel)),
    values: Array.from(values.values()),
  };
}
