import { isNil } from 'lodash';

/* eslint-disable-next-line @typescript-eslint/ban-types */
export type Maybe<TValue> = TValue | null | undefined;
export type Predicate<TValue> = (v: TValue) => boolean;

export function doesExist<TReturn>(v: Maybe<TReturn>): v is TReturn {
  return !isNil(v);
}

export function setOrAdd(m: Map<string, number>, k: string, v: number) {
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
