
//T is a custom type that I'll define behaviors of
function t(obj) {
	
	return { //interface
		toString: () => obj.toString(),
		valueOf: () => true,
	}
}

function t(value) {
	if (typeof value !== 'number') {
		throw new Error('Expected number');
		return;
	}
	
	return {
		toString() {
			switch(value) {
				case 1:
					return 'one';
					break;
				case 2:
					return 'two';
					break;
				default:
					return 'not-one-nor-two';
					break;
			}
		},
		valueOf() {
			return value * 100;
		},
		add() {
			console.log('add was called');
		}
		}
	}
	


//goal: t(1) + t(2) == "one two"
//t(1).toString() == "one"
//t('one') == ERROR EXPECTED NUMBER.
const log = console.log;
const t1 = t(1);
const t2 = t(2);
const t3 = t(3);
	
log('t(1) is', t1.toString());
log('t(2) is', t2.toString());
log('t(3) is', t3.toString());

const t1t2 = t1 * t2;
log('t1 + t2 is ', t1t2)

//const ta = t('a');