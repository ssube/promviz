import { expect } from 'chai';
import { baseName, splitName } from '../src/graph';

describe('graph helpers', () => {
  describe('split name', () => {
    it('should split segments', () => {
      expect(splitName('foo_bar_bin')).to.deep.equal(['foo', 'bar', 'bin']);
    });
  });

  describe('base name', () => {
    it('should remove last segment', () => {
      expect(baseName('foo_bar_bin')).to.equal('foo_bar');
    });
  });
});
