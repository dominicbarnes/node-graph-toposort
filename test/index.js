
var assert = require('chai').assert;
var Graph = require('graph.js/dist/graph.full.js');
var toposort = require('..');

describe('toposort(graph)', function () {
  it('export a function', function () {
    assert.isFunction(toposort);
  });

  it('should return an array', function () {
    var graph = new Graph();
    assert.isArray(toposort(graph));
  });

  it('should handle graphs that have a cycle', function () {
    // a -> b -> c -> d -> b* (cycle)
    var graph = new Graph(
      [ [ 'a', 'b' ] ],
      [ [ 'b', 'c' ] ],
      [ [ 'c', 'd' ] ],
      [ [ 'd', 'b' ] ]
    );

    assert.deepEqual(toposort(graph), [ 'a', 'b', 'c', 'd' ]);
  });

  it('should correctly sort a simple tree', function () {
    // a -> b -> c
    var graph = new Graph(
      [ [ 'a', 'b' ] ],
      [ [ 'b', 'c' ] ]
    );

    assert.deepEqual(toposort(graph), [ 'a', 'b', 'c' ]);
  });

  it('should correctly sort a tree with branches', function () {
    // a -> b -> c
    //   -> d -> e -> f
    var graph = new Graph(
      [ [ 'a', 'b' ] ],
      [ [ 'b', 'c' ] ],
      [ [ 'a', 'd' ] ],
      [ [ 'd', 'e' ] ],
      [ [ 'e', 'f' ] ]
    );

    assert.deepEqual(toposort(graph), [ 'a', 'b', 'd', 'c', 'e', 'f' ]);
  });

  it('should correctly sort a tree with interconnected branches', function () {
    // a -> b -> c
    //   -> d ->
    var graph = new Graph(
      [ [ 'a', 'b' ] ],
      [ [ 'a', 'd' ] ],
      [ [ 'b', 'c' ] ],
      [ [ 'd', 'c' ] ]
    );

    assert.deepEqual(toposort(graph), [ 'a', 'b', 'd', 'c' ]);
  });
});
