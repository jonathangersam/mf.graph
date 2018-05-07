// const INPUT_PATH = "./tmp/tzsr.csv";
// const OUTPUT_PATH = "./tmp/tzsr.json";


/* FP Functions */
function getJsonFromCsv(path, callback){
    const csv=require('csvtojson');
    let data = [];
    csv().fromFile(path)
        .on('json', d => {data.push(d)})
        .on('done', () => {callback(data)});
}

function getGraphFromArray(arr) {
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


const INPUT_PATH = process.argv[2]

if (!INPUT_PATH) {
    console.log('missing reqquired arg. Expected format is <node csv-to-json.js inputpath [outputpath]>')
    process.exit(1)
}

const OUTPUT_PATH = process.argv[3] || process.argv[2] + '.json'

/* MAIN */
getJsonFromCsv(INPUT_PATH, function(d) {
    console.log(d);

    const graph = getGraphFromArray(d);
    console.log(graph);

    require('fs').writeFileSync(OUTPUT_PATH, JSON.stringify(graph, null, '\t'));
});