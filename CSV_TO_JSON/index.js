const PATH = "./tmp/data.csv";


/* BOOTSTRAP */
getJsonFromCsv(PATH, function(d) {
    console.log(d);
});

/* FP Functions */
function getJsonFromCsv(path, callback){
    const csv=require('csvtojson');
    let data = [];
    csv().fromFile(path)
        .on('json', d => {data.push(d)})
        .on('done', () => {callback(data)});
}

