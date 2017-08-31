
a = 'a'
b = 'b'

o1 = { a, b }
o2 = { ...o1} //warning: not supported yet in Node JS and Chrome (Main)

o1.c = 'c'

log=console.log

log('o1 is', o1)
log('o2 is', o2)