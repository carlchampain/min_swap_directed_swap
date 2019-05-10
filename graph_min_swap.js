function Graph() {
    this.adjList = {}
    this.numberOfEdges = 0;
    this.numberOfCycles = 0;
    this.startingNodeCycle = [];
}

Graph.prototype.addVertex = function (vertex) {
    this.adjList[vertex] = []
}

Graph.prototype.addEdge = function (vertex1, vertex2) {
    this.adjList[vertex1].push(vertex2)
    this.numberOfEdges++
}

Graph.prototype.printGraph = function () {
    // get all the vertices 
    var get_keys = Object.keys(this.adjList)

    // iterate over the vertices 
    for (var i of get_keys) {
        // great the corresponding adjacency list 
        // for the vertex 
        var get_values = Object.values(this.adjList[i])
        var conc = "";

        // iterate over the adjacency list 
        // concatenate the values into a string 
        for (var j of get_values)
            conc += j + " ";

        // print the vertex and its adjacency list 
        console.log(i + " -> " + conc);
    }
}

Graph.prototype.dfs = function () {
    const nodes = Object.keys(this.adjList)
    const visited = {}
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        this._dfsUtil(node, visited)
    }
}

Graph.prototype._dfsUtil = function (vertex, visited) {
    if (!visited[vertex]) {
        visited[vertex] = true
        const neighbors = this.adjList[vertex]
        console.log('Vertex : ', vertex, 'neighbors : ', neighbors)
        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i]
            this._dfsUtil(neighbor, visited)
        }
    }
}

Graph.prototype.detectCycle = function () {
    const graphNodes = Object.keys(this.adjList);
    const visited = {};
    const recStack = {};
        const node = graphNodes[0]
        if (this._detectCycleUtil(node, visited, recStack)) {
            this.startingNodeCycle.push(node);
            console.log('node : ', this.startingNodeCycle);
            this.numberOfCycles++
        }    
    return this.numberOfCycles;
}

//[0, 2, 3, 4, 1, 6, 5];
Graph.prototype._detectCycleUtil = function (vertex, visited, recStack) {
    if (!visited[vertex]) {
        visited[vertex] = true;
        recStack[vertex] = true;
        const nodeNeighbors = this.adjList[vertex];
        for (let i = 0; i < nodeNeighbors.length; i++) {
            const currentNode = nodeNeighbors[i];
            console.log('parent', vertex, 'Child', currentNode);
            if (!visited[currentNode] && this._detectCycleUtil(currentNode, visited, recStack)) {
                return true;
            } else if (recStack[currentNode]) {
                return true;
            }
        }
    }
    recStack[vertex] = false;
    return false;
}

const graph = new Graph()


function minimumSwaps(arr) {
    var lowestValue = Math.min(...arr);
    var swaps = 0;
    var misPositionedElem = 0;
    var node = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === lowestValue + i) {
            node[i] = 'good position';
        } else {
            misPositionedElem++;
            node[i] = [arr[i], arr[arr.indexOf(lowestValue + i)]];
            graph.addVertex(arr[i]);
        }
    }
    for (var j = 0; j < node.length; j++) {
        if (node[j] === 'good position') {
            console.log('continue loop');
            continue;
        } else {
            console.log(node[j]);
            graph.addEdge(...node[j]);
        }
    }
    var cycles = graph.detectCycle();
    swaps = misPositionedElem - cycles;
    return swaps;
}

var initialArr = [0, 2, 3, 4, 1, 6, 5];
// var initialArr = [0,1,2,3,4];

minimumSwaps(initialArr);
