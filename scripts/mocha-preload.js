import JSDOM from 'jsdom-global';
import sourceMapSupport from 'source-map-support';

export const jsdom = JSDOM();

sourceMapSupport.install({
  environment: 'node',
  handleUncaughtExceptions: true,
  hookRequire: true,
});

window.URL.createObjectURL = function () { };
