/* MAIN FUNCTION */
function curry(f) {
	const expectedArgs = f.length; //aka "arity"
	let savedArgs = [];
	
	//an interface that a) runs the curried f when all args supplied, or b) saves the partial arg, then returns the interface again
	return function saveAnotherPartialArgOrRunActualArg(){
		if (savedArgs.length + arguments.length  < expectedArgs) {
			savedArgs = savedArgs.concat(Array.prototype.slice.call(arguments));
			return saveAnotherPartialArgOrRunActualArg; //not yet time to call actual. return the interface
		}
			
		return f.apply(this, savedArgs.concat(Array.prototype.slice.call(arguments)));
	}
}

/* All these three ways of defining the function is successful */
/*
function add(x, y) {
	return x + y;
}
*/

//const add =(x, y) => x + y;

const add = x => y => x + y;


/* CURRY IT */
const curriedAdd = curry(add);

console.log('add is', add.toString());
console.log('curriedAdd is', curriedAdd.toString());

/* DO PARTIAL APPLICATION */
const incrementBy2 = curriedAdd(2);

console.log('incrementBy2 is', incrementBy2.toString());

console.log('incrementBy2(4) is', incrementBy2(4));
console.log('incrementBy2(8) is', incrementBy2(8));

/* SIMPLE TEST */
const testResult = incrementBy2(4) === 6 && incrementBy2(8) === 10 ? 'success' : 'retry';
console.log('testResult is', testResult);