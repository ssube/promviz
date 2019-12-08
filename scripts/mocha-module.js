// mocha loader for es6 modules
import('../out/test.mjs').then(() => run()).catch(err => {
  console.error(err);
  process.exit(1);
});