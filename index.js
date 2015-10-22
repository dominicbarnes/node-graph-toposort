
'use strict';

module.exports = function toposort(graph) {
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
};

function sources(graph) {
  return Array.from(graph.sources()).map(source => source[0]);
}

function clone(graph) {
  return graph.clone(empty, empty);
}

function empty() {
  return null;
}
