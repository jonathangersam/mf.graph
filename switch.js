//utilities
const log = console.log;
const l = label => (...xs) => console.log(label, ...xs);
const mlog = x => {console.log(x); return x}
const prop = p => o => o[p];
const id = x => x;

//experiment
const lookup = table => getter => key =>  getter(table, key);
const lookup2 = table => getter => keyname => o =>  getter(table, prop(keyname)(o) );
const switcher = getter => behaviors => accessor => o =>  getter(behaviors, accessor(o)) //getter first since its dictated by the table type (Map/Dict, POJO, Array, etc)

//Given
const letters = new Map([
	['a', 'apple'],
	['b', 'banana'],
	['c', 'cherry']
]);

const behaviors = new Map([
	['inc', x => x + 1],
	['dec', x => x - 1],
	['double', x => x * 2],
	['half', x => x * 0.5]
])

const data = [
	{id: 'a'},
	{id: 'b'},
	{id: 'b'},
	{id: 'a'},
]

const data2 = [
	{op: 'inc'},
	{op: 'double'},
	{op: 'half'},
	{op: 'inc'},
]

//Test 1
const lookupLettersByKey = lookup(letters)((table, key) => table.get(key));

log('*** LOOKUP 1 ***');
l('get a')(lookupLettersByKey('a'));
l('get c')(lookupLettersByKey('c'));

//Test 2
const lookupLettersByKey2 = lookup2(letters)((table, key) => table.get(key))('id');

log('*** LOOKUP 2 ***');
l('get data[0]')(lookupLettersByKey2(data[0]));
l('get data[1]')(lookupLettersByKey2(data[1]));

const mappedData1 = data.map(lookupLettersByKey2);
l('mapped data 1')(mappedData1);

//Test 3
const switchBehaviorByOp = switcher((table, key) => table.has(key) ? table.get(key) : id)(behaviors)(prop('op'));

log('*** SWITCHER ***')
l('switch data2[0]')(switchBehaviorByOp(data2[0]));
l('switch data2[1]')(switchBehaviorByOp(data2[1]));

/*
const switchLetters = switcher(letters)
const switchLettersById = switcher(letters)(prop('id'));



//test
const words = data.map(switchLettersById);
log('words:', words);
*/