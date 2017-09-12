log = console.log;

//BLACK MAGIC CURRY
const curry = (f, ...a) =>
    (...b) => ((...ab) => ab.length === f.length ? f(...ab) : curry(f, ...ab))(...a, ...b);
	

add = (x,y) => x + y;
curriedAdd = curry(add)
add1 = curriedAdd(1);
add2 = curriedAdd(2)

add3Things = (x,y,z) => x + y + z;
curriedAdd3Things = curry(add3Things);
curriedAdd3Things2 = curriedAdd3Things(2);
curriedAdd3Things23 = curriedAdd3Things(2,3);


log('add1(2) is', add1(2));
log('add2(5) is', add2(5));

log('curriedAdd3Things2(3,4) is', curriedAdd3Things2(3,4));
log('curriedAdd3Things2(3)(4) is', curriedAdd3Things2(3)(4));
log('curriedAdd3Things23(4) is', curriedAdd3Things23(4));



module.exports.curry = curry;


