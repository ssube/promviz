#! /usr/bin/env node
// mocha loader for es6 modules
import { jsdom } from './mocha-preload';
import '../out/test.mjs';

console.log('tests loaded');
jsdom();
