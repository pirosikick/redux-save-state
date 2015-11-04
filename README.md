[![npm version](https://badge.fury.io/js/hiden-no-tare.npm.svg)](http://badge.fury.io/js/hiden-no-tare.npm)
[![david](https://david-dm.org/pirosikick/hiden-no-tare.npm.svg)](https://david-dm.org/pirosikick/hiden-no-tare.npm)
[![Build Status](https://travis-ci.org/pirosikick/hiden-no-tare.npm.svg)](https://travis-ci.org/pirosikick/hiden-no-tare.npm)

hiden-no-tare.npm
=================

A project template of Node.js package for [@pirosikick](https://github.com/pirosikick).

## Hou to use

### Initialize git repositry

```sh
$ git clone https://github.com/pirosikick/hiden-no-tare.npm.git your-npm-package
$ cd your-npm-package

# Initialize git repositry
$ rm -rf .git
$ git init
$ git add .
$ git commit -m "Initial commit"

# Install dependencies
$ npm install
```

### npm scripts

All tasks for development defines with npm scripts.

```
$ npm run
Available scripts in the hiden-no-tare.npm package:
  build
    babel src -d lib
  fixpack
    fixpack
  lint
    eslint src test
  test
    npm run build && mocha test/ --recursive --compilers js:espower-babel/guess
  watch
    babel src -d lib -w & mocha --compilers js:espower-babel/guess -w
```

## License

[MIT](http://pirosikick.mit-license.org/)
