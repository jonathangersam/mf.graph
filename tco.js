//demos tail call optimization.
//note: should be run with --harmony flag. ie: "NODE --HARMONY <THISFILE.JS>"

'use strict'

//unoptimized power. should blow call frame stack when called with high p value
const upow = (n, p) => !p ? 1 : n * upow(n, p - 1); 

//tail call optimized version
const pow = (n, p, agg=1) => !p ? agg : pow(n, p-1, agg * n); //this is like array.reduce() 

//utilities
const log = console.log;
const trial = failf => f => {try {return f()} catch (e){return failf()}};  //try catch block
const maybe = f => trial(() => undefined)(f);                              //it either works or returns undefined.

//test
log('optimized 4^2:', pow(4, 2));
log('unoptimized 4^2:', pow(4, 2));

log('unoptimized 4^123456789:', maybe(() => upow(4, 123456789)));
log('optimized 4^123456789:', maybe(() => pow(4, 123456789)));

