/* UTILITIES */
const log = console.log;
const mlog = label => x => {log(label, x); return x}; //monadic log
const compose = (...fns) => x => fns.reduceRight((a, f) => f(a), x);
const id = x => x;
const prop = p => o => o[p];
const map = fn => arr => arr.map(fn);

/* GIVEN */
const arithmeticOps = new Map([ //so this is like haskell guard clause / pattern match?
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
	{op: 'inc', value: 2, name:'patty', pre:'hi', gender:'male'},
	{op: 'dec', value: 2, name:'mini', pre:'hello', gender:'female'},
	{op: 'double', value: 2, name:'fridge', pre:'mabuhay', gender:'undeclared'},
	{op: 'triple', value: 2, name:'scrappy dog', pre:'greetings', gender:'male'}
]

const lookupGenderSpecificGreeting = x => { //this is closer to a haskell guard clause
	switch(x){
		case 'male': return x => 'Mr.' + ' ' + x.name;
		case 'female': return x => 'Ms' + ' ' + x.name;
		default: return x => 'Hoy!' + ' ' + x.name; 
	}
}

/* BEHAVIORS FOR LOOKUP PROCESS */
const getByKeyFromDict = dict => key => dict.has(key) ? dict.get(key) : compose(mlog('not found in dict, defaulting to'), id); 
const getByPropFromObj = obj => propname => obj[propname];

/* LOOKUP */
const lookup = getter => table => key => getter(table)(key);

//LOOKUP SPECIALIZATION FOR DICTIONARIES
const lookupDict = lookup(getByKeyFromDict);
const lookupArithmeticOps = lookupDict(arithmeticOps);

//LOOKUP SPECIALIZATION FOR PLAIN OBJECTS
const lookupObj = lookup(getByPropFromObj);
const lookupGreetings = lookupObj(greetings);

/* TEST */
const applyArithmeticOpsByOp = x => lookupArithmeticOps(x.op)(x);
const applyGreetingByPre = x => lookupGreetings(prop('pre')(x))(x);
const applySaluationByGender = x => lookupGenderSpecificGreeting(x.gender)(x)

const numbers = data.map(applyArithmeticOpsByOp);
log('i have the ff numbers', numbers);

const greeteds = map(applyGreetingByPre)(data);
log('the greets', greeteds);

const persons = map(x => applySaluationByGender(x))(data);
log('persons with their saluations', persons);


