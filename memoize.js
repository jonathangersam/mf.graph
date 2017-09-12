// memoize :: (a -> b) -> (a -> b)
const memoize = (f, o={}) => (...x) => o[x.toString()] ? o[x.toString()] : o[x.toString()] = f(...x);

//utility:
mlog = label => x => {console.log(label, x); return x}; //monadic log so we don't keep typing "return" in arrow functions
log = console.log;

log(`asked for 1, got ${memoizedGetData(1)}`); //(A) trigger actual f, then memoize/caches result.
log(`asked for 2, got ${memoizedGetData(2)}`); //same as (A) but for arg value == 2
log(`asked for 1, got ${memoizedGetData(1)}`); //returns the memoized/cached result from (A)

// test 1:
const getDataFromServer = x => {console.log('server replied at', new Date()); return x * 100};
const memoizedGetData = memoize(getDataFromServer);

//test 2:
const shout = (x,y) => mlog('***generating shout***')(x.toUpperCase() + ', ' + y.toUpperCase() + '!!'); //simple string concat, with logging
const memoizedShout = memoize(shout);

log('scrappy, patty:', memoizedShout('scrappy', 'patty')); //(B) trigger actual f, then memoize/cache result
log('scrappy, patty:', memoizedShout('scrappy', 'patty')); //returns the memoized/cached result from (B)

log('patty, scrappy:', memoizedShout('patty', 'scrappy'));
log('patty, scrappy:', memoizedShout('patty', 'scrappy'));

module.exports.memoize = memoize;