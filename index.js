
'use strict';

// single export
module.exports = toposort;

/**
 * Topologically sort the input graph using Kahn's algorithm.
 *
 * @param {Graph} graph  The input graph.js instance.
 * @return {Array}       A topologically sorted list of vertex keys.
 */
function toposort(graph) {
  // TODO: use kahn's algorithm to detect cycles instead?
  if (graph.hasCycle()) {
    throw new Error('cycle detected in graph, topological sort is impossible');
  }

  let g = clone(graph);
  let s = sources(g);
  let l = [];

  while (s.length) {
    let n = s.shift(); // vs pop?
    l.push(n);
    for (let e of g.verticesFrom(n)) {
      let m = e[0];
      g.removeExistingEdge(n, m);
      if (g.inDegree(m) === 0) {
        s.push(m);
      }
    }
  }

  return l;
}

/**
 * Helper for retrieving a flat list of source vertices in the input graph.
 *
 * @param {Graph} graph  The input graph.js instance.
 * @return {Array}       No guaranteed order.
 */
function sources(graph) {
  return Array.from(graph.sources()).map(source => source[0]);
}

/**
 * Helper for cloning the input graph. (since our algorithm mutates the graph
 * during traversal)
 *
 * @param {Graph} graph  The input graph.js instance.
 * @return {Graph}       A clone of the original, without vertex/edge values.
 */
function clone(graph) {
  return graph.clone(empty, empty);
}

/**
 * Helper to return null in place of any input vertex/edge during cloning, as
 * we only care about the graph structure, not the values contained within.
 *
 * @return {null}
 */
function empty() {
  return null;
}
