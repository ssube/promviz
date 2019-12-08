import { expect } from 'chai';

import { doesExist, setOrAdd } from '../src/utils';

const TEST_KEY = 'test';
const TEST_BASE = 10;
const TEST_ADD = 5;
const TEST_TOTAL = 15;

describe('helper utils', () => {
  describe('does exist', () => {
    it('should test if value exists', () => {
      expect(doesExist('')).to.equal(true);
      /* eslint-disable-next-line no-null/no-null */
      expect(doesExist(null)).to.equal(false);
      expect(doesExist(undefined)).to.equal(false);
    });
  });

  describe('set or add', () => {
    it('should set missing items', () => {
      const m = new Map();
      setOrAdd(m, TEST_KEY, Math.random());
      expect(m.has(TEST_KEY));
    });

    it('should add to existing items', () => {
      const m = new Map([
        [TEST_KEY, TEST_BASE],
      ]);
      setOrAdd(m, TEST_KEY, TEST_ADD);
      expect(m.get(TEST_KEY)).to.equal(TEST_TOTAL);
    });
  });
});
