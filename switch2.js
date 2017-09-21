/* UTILITIES */
const log = console.log;
const mlog = label => x => {log(label, x); return x}; //monadic log
const compose = (...fns) => x => fns.reduceRight((a, f) => f(a), x);
const id = x => x;
const prop = p => o => o[p];

/* GIVEN */
const arithmeticOps = new Map([ //so this is haskell guard clause / pattern match?
	['inc', x => x.value + 1],
	['dec', x => x.value - 1],
	['double', x => x.value * 2],
	['half', x => x.value * 0.5]
])

const greetings = {
	hi: x => 'Hi' + ' ' + x.value,
	hello: x => 'Hello' + ' ' + x.value,
	mabuhay: x => 'MaBuHay' + ' ' + x.value,
	greetings: x => 'Greeeeeetings' + ' ' + x.value
}

const data = [
	{op: 'inc', value: 2, pre:'hi'},
	{op: 'dec', value: 2, pre:'hello'},
	{op: 'double', value: 2, pre:'mabuhay'},
	{op: 'triple', value: 2, pre:'greetings'},
]

/* LOOKUP */
const lookup = getter => table => key => getter(table, key);

//lookup Maps (Dictionaries) *** specialization ***
const lookupDict = lookup((t, k) => t.has(k) ? t.get(k) : id);
const lookupArithmeticOps = lookupDict(arithmeticOps); //applied to arithmeticOps Map/Dict

//lookup Objects *** specialization ***
const lookupObj = lookup((o, k) => prop(k)(o))
const lookupGreetings = lookupObj(greetings); //applied to greetings Object

/* PATTERN MATCH */
const match = getter => accessor => o => (compose(getter, accessor)(o))(o);

// applications of MATCH
const matchArithmeticOpsByOp = match(lookupArithmeticOps)(prop('op'));
const matchGreetingsByPre = match(lookupGreetings)(prop('pre'));

//test
const numbers = data.map(matchArithmeticOpsByOp);
const greeteds = data.map(matchGreetingsByPre);
log(numbers);
log(greeteds);
