/* eslint-disable */
const fs = require('fs');
const _ = require('lodash');

const rootPackageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const appPackageJson = JSON.parse(fs.readFileSync('./app/package.json', 'utf8'));
const newDependencies = _.merge(rootPackageJson.dependencies, appPackageJson.dependencies);
appPackageJson.dependencies = newDependencies;

fs.writeFile(
  './app/package.json', 
  JSON.stringify(appPackageJson, null, 2), 
  'utf8', 
  function(err) {
    if (err) throw err;
    console.log('Successfully merged dependencies');
  }
);