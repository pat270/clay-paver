var requireDir = require('require-dir');
var path = require('path');

global.appRoot = path.resolve(__dirname);

requireDir(path.join(global.appRoot, 'gulp', 'tasks'), { recurse: true });