/* recursively selects all child nodes and parent nodes from CSV file */
const csv = require('csvtojson');

const instructions = `missing required arg. Expected format is <node narrow-csv.js rootnode inputpath.csv>, where .csv file contains columns labelled 'source', 'target', and 'label'.`

/* Functions */
function getArrayFromCsv(path, callback){
    let data = []
    csv().fromFile(path)
        .on('json', d => {data.push(d)})
        .on('done', () => {callback(data)})
}

function areRowsEqual(rowA, rowB, opt = {}) {
    const isEqual = rowA.source == rowB.source && rowA.target == rowB.target && rowA.label == rowB.label

    if (opt.verbose) {
        console.log({rowA}, 'v', {rowB}, {isEqual})
    }    

    return isEqual
}

function areRowsDifferent(rowA, rowB, opt = {}) {
    return !areRowsEqual(rowA, rowB, opt)
}

function reducerGetUniqueRows(accum, elem, index) { // Reducer        
    if (accum.length == 0) {        
        return [...accum, elem]
    } 

    if (accum.filter(a => areRowsEqual(a, elem)).length == 0) {
        return [...accum, elem]
    }
     
    return accum
}

const reducerGetUniqueElements = (acc, ele) => // Reducer
    acc.length == 0 || !acc.includes(ele) ? [...acc, ele] : acc

/* Get Own Nodes */
function getOwnRows (rootNode, arrayData){
    const ownRows = arrayData
        .filter(d => d.source == rootNode)
        .reduce(reducerGetUniqueElements, [])

    return ownRows
}

/* Get Grand/Children Nodes */
function getChildRows (rootNode, arrayData){
    const childNodes = arrayData
        .filter(d => d.source == rootNode)
        .map(d => d.target)
        .reduce(reducerGetUniqueElements, [])

    // console.log({childNodes})

    const childRows = arrayData
        .filter(d => childNodes.includes(d.source))
        .reduce(reducerGetUniqueRows, [])

    // console.log({childRows})

    return childRows
}

function getChildRowsRecursively (rootNode, arrayData, depthLimit = 10) {    
    let childRows = getChildRows(rootNode, arrayData)

    // terminal condition
    if (childRows.length == 0 || depthLimit == 0) {
        return []
    }

    // console.log({childRows})

    const arrayDataRemaining = arrayData
        .filter(row => childRows.some(ele => areRowsDifferent(ele,row)))

    // recursive leg
    return childRows
        .map(c => getChildRowsRecursively(c.source, arrayDataRemaining, depthLimit - 1))
        .reduce((accum, ele) => accum.concat(...ele), childRows)
        .reduce(reducerGetUniqueRows, [])
}

/* Get Grand/Parent Nodes */
function getParentRows (rootNode, arrayData){
    const parentRows = arrayData
        .filter(d => d.target == rootNode)
        .reduce(reducerGetUniqueRows, [])

    return parentRows
}

function getParentRowsRecursively (rootNode, arrayData, depthLimit = 5) {    
    let parentRows = getParentRows(rootNode, arrayData)

    // terminal condition
    if (parentRows.length == 0 || depthLimit == 0) {
        return []
    }

    const arrayDataRemaining = arrayData
        .filter(row => parentRows.some(ele => areRowsDifferent(ele,row)))

    // recursive leg
    return parentRows
        .map(c => getParentRowsRecursively(c.source, arrayDataRemaining, depthLimit - 1))
        .reduce((accum, ele) => accum.concat(...ele), parentRows)
        .reduce(reducerGetUniqueRows, [])
}

/* Print as CSV */

function csvStringFromArrayOfObj (arrayOfObj) {
    const csvString = arrayOfObj
        .map(x => `${x.source},${x.label},${x.target}`)
        .join('\n')
    return 'source,label,target\n' + csvString
}

/* MAIN */

// get input args
const ROOT_NODE = process.argv[2]
const INPUT_PATH = process.argv[3]

const MAX_CHILD_DEPTH = 10
const MAX_PARENT_DEPTH = 5

if (!ROOT_NODE || !INPUT_PATH) {
    console.log(instructions)
    process.exit(1)
}

// process
getArrayFromCsv(INPUT_PATH, function(arrayData) {        
    const ownRows = getOwnRows(ROOT_NODE, arrayData)
    // console.log({ownRows})

    const allChildRows = getChildRowsRecursively(ROOT_NODE, arrayData, MAX_CHILD_DEPTH)
    // console.log({allChildRows})

    const allParentRows = getParentRowsRecursively(ROOT_NODE, arrayData, MAX_PARENT_DEPTH)
    // console.log({allParentRows})

    const mergedRows = ownRows
        .concat(allChildRows)
        .concat(allParentRows)
        .reduce(reducerGetUniqueRows, [])
        .sort((a, b) => {
            if (a.source < b.source) {
                return -1
            }

            if (a.source > b.source) {
                return 1
            }

            return 0
        })
    // console.log({mergedRows})

    console.log(csvStringFromArrayOfObj(mergedRows))
});

