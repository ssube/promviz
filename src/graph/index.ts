/* eslint-disable no-null/no-null */
function isNil<T>(it: T | null | undefined): it is null | undefined {
  return it === null || it === undefined;
}
/* eslint-enable no-null/no-null */

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

function baseName(name: string) {
  const parts = name.split('_');
  return parts.slice(0, parts.length - 1).join('_');
}

export function parseNames(names: Map<string, number>) {
  const values = new Map<string, number>();
  for (const [name, weight] of names) {
    setOrAdd(values, name, weight);
    const segments = name.split('_');
    for (let i = 0; i < segments.length; ++i) {
      const part = segments.slice(0, i).join('_');
      setOrAdd(values, part, weight);
    }
  }

  return {
    labels: Array.from(values.keys()),
    parents: Array.from(values.keys()).map(baseName),
    values: Array.from(values.values()),
  };
}
