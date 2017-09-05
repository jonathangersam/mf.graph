j = 'jon'
g = 'gretch'

log = console.log;

log(`${j} and ${g}`); //jon & gretch

lineOld = 'i\n' +
	'am\n' +
	'an\n' + 
	'ES5\n' +
	'multi'+
	'line'
	
log(lineOld);

lineNew = 'i\n\
am\n\
an\n\
es6\n\
multi\
line';
	
log(lineNew);