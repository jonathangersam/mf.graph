const csv = require('csvtojson');
const fs = require('fs')

/* FP Functions */
function getArrayFromCsv(path, callback){
    let data = [];
    csv().fromFile(path)
        .on('json', d => {data.push(d)})
        .on('done', () => {callback(data)});
}

function getJsonGraphFromArray(arr) {
    let nodeIds = [];

    const edges = arr.map(function(d){
        //if source node or target node is new, add it to the list
        if (nodeIds.indexOf(d.source) === -1) {
            nodeIds.push(d.source);
        }

        if (nodeIds.indexOf(d.target) === -1) {
            nodeIds.push(d.target);
        }

        //return an edge
        return {
            source: nodeIds.indexOf(d.source),
            target: nodeIds.indexOf(d.target),
            label: d.label
        };
    });

    //return nodes and edges in a single object
    return {
        nodes: nodeIds.map(item => {return {id: item}}),
        edges: edges
    }
}

/* MAIN */
const INPUT_PATH = process.argv[2]

if (!INPUT_PATH) {
    console.error(`missing required arg. \
    Expected format is <node json-graph-from-csv.js inputpath.csv>, \
    where .csv file contains columns labelled 'source', 'target', and 'label'.`)
    process.exit(1)
}

const OUTPUT_PATH = process.argv[3] || INPUT_PATH + '.json'

getArrayFromCsv(INPUT_PATH, function(arrayData) {    
    const jsonGraph = getJsonGraphFromArray(arrayData);
    const jsonGraphAsString = JSON.stringify(jsonGraph, null, '\t')
    console.log(jsonGraphAsString)
    // fs.writeFileSync(OUTPUT_PATH, jsonGraphAsString)    
    // process.stdout.write(OUTPUT_PATH)
    //console.log(OUTPUT_PATH)
});