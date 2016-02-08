# node-graph-toposort

> A modified implementation of [Kahn's Algorithm](https://en.wikipedia.org/wiki/Topological_sorting#Kahn.27s_algorithm)
> for [topologically sorting](https://en.wikipedia.org/wiki/Topological_sorting) a
> [graph.js](https://github.com/mhelvens/graph.js) instance.

[![npm version](https://img.shields.io/npm/v/graph-toposort.svg)](https://www.npmjs.com/package/graph-toposort)
[![build status](https://img.shields.io/travis/dominicbarnes/node-graph-toposort.svg)](https://travis-ci.org/dominicbarnes/node-graph-toposort)

## Install

```sh
$ npm install graph-toposort
```

## Example

```js
var toposort = require('graph-toposort');
var Graph = require('graph.js');

// a -> b -> c
var graph = new Graph(
  [ 'a', 'b' ],
  [ 'b', 'c' ]
);

var list = toposort(graph);
// [ 'a', 'b', 'c' ]
```

## Usage

This algorithm is useful when determining what order to go in when dealing with a tree of dependencies.
While circular dependencies are being handled, it is still an experimental feature, so please report any
problems you find with it.

### toposort(graph)

Given the input `graph`, it will return an `Array` of the vertex keys sorted topologically.
