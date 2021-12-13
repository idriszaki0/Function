'use strict';

// Default Parameters
const bookings = [];

const createBooking = function(flightNum, numPassengers = 1, price = 199 * numPassengers) {

  // ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {  
    flightNum,
    numPassengers,
    price
  }
  console.log(booking)
  bookings.push(booking)
}

createBooking('LH123')
createBooking('LH123', 2, 800)
createBooking('LH123', 2)
createBooking('LH123', 5)

createBooking('LH123',undefined, 1000)

// How passing arguments works_ value vs reference

const flight = 'LH234';
const idris = {
  name: 'Idris Zaki',
  passport: 234566788
}

const checkIn = function(flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr.' + passenger.name;

  if(passenger.passport === 234566788) {
    alert('Checked in')
  } else {
    alert('Wrong passport')
  }
}

// checkIn(flight, idris);
// console.log(flight)
// console.log(idris);

const flightNum = flight;
const passeger = idris

const newPassport = function(person) {
  console.log(person.passport = Math.trunc(Math.random() * 100000))
}

// newPassport(idris)
// checkIn(flight, idris)

// first-class and higher-order function
// function accepting callback function

const oneWord = function(str) {
  return str.replace(/ /g, '').toLowerCase();
}

const upperFirstWord = function(str) {
  const [first, ...others]= str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
}
// higher order function
const transformer = function(str, fn) {
  console.log(`Original string: ${str}`)
  console.log(`Transformed string: ${fn(str)}`)

  console.log(`Transformed by: ${fn.name}`)
}

transformer('Javascript is the best', upperFirstWord);
transformer("Javascript is the best", oneWord);

// JS uses callbacks all the time
const high5 = function() {
  console.log('fire')
}

document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5)

// FUNCTION returning functions
const greet = function(greeting) {
  return function(name) {
    console.log(`${greeting} ${name}`)
  }
}
const greeterHey = greet('Hey')
greeterHey('Idris')
greeterHey('Zaki')
// = below above
greet('Hello')('Idris')

const greets = (greeting) => (name) => console.log(`${greeting} ${name}`);

greets('Yo')('Deris')
const greeter = greets('Hai')
greeter('Idris')

// the call and apply methods

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  booking: [],
  // book: function() {}
  book(flightNum, name) {
    console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
    this.booking.push({flight: `${this.iataCode}${flightNum}`, name})
  },
}
lufthansa.book(239, 'Idris Zaki')
// value, name
lufthansa.book(239, "Arul Kanda");
console.log(lufthansa)

const eurowings = {
  airline: 'EuroWings',
  iataCode: 'EW',
  booking: []
}

const book = lufthansa.book;

// Does not work
// book(23, "sarah William")

// call method
book.call(eurowings, 23, 'Idris Zaki')
console.log(eurowings)
book.call(lufthansa, 239, 'ayamsdas')
console.log(lufthansa)

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'SW',
  booking: []
}
book.call(swiss, 78, 'Tandjiro')
console.log(swiss)

// apply method
const flightData = [534, 'Amirul']
book.apply(swiss, flightData)
console.log(swiss)

book.call(swiss, ...flightData)

// the bind method
// book.call(eurowings, 23, "Idris Zaki");

const bookEw = book.bind(eurowings)
const bookLH = book.bind(lufthansa)
const bookSW = book.bind(swiss)
bookEw(23, 'Steven William')
bookLH(24, 'Aning')

const bookEw23 = book.bind(eurowings, 23)
bookEw23('Norman hamim')
bookEw23('Norlan')

// with eventListeners
lufthansa.planes = 300;
lufthansa.buyPlanes = function() {
  console.log(this)
  this.planes++
  console.log(this.planes)
}
// lufthansa.buyPlanes()

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlanes.bind(lufthansa))

// partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200))

const addVAT = addTax.bind(null, 0.23)
// addVAT = value => value + value * 0.23;
console.log(addVAT(100));
console.log(addVAT(23))

const addTaxRate = function(rate) {
  return function(value){
    return value + value * rate;
  }
}
const addVAT2 = addTaxRate(0.23)
console.log(addVAT2(100))
console.log(addVAT2(23));

// immediately invoked function expressions (IIFE)
const runOnce = function() {
  console.log('This will never run again')
}
runOnce();
// another way to express function
(function () {
  console.log("This will never run again");
  const isPrivate = 23;
})()
// console.log(isPrivate)
// or
// (() => console.log("This will also never run again"))();

{
  const isPrivate = 23;
  var notPrivate = 46
}
// console.log(isPrivate)
console.log(notPrivate)

// closures
const secureBooking = function() {
  let passengerCount = 0;
  return function() {
    passengerCount++
    console.log((`${passengerCount} passengers`))
  }
}

const booker = secureBooking()

booker()
booker()
booker()

console.dir(booker)

// more closure examples
let f;
const g = function() {
  const a = 23;
  f = function() {
    console.log(a * 2)
  }
}

const h = function() {
  const b = 777;
  f = function() {
    console.log(b * 2)
  }
}
g()
f()
console.dir(f);
// Re-assigning f function
h()
f()
console.dir(f)

// Example 2
const boardPassengers = function(n, wait) {
  const perGroup = n / 3

  setTimeout(function(){
    console.log(`We are now boarding all ${n} passengers`)
    console.log(`There are 3 groups, each with ${perGroup} passengers`)
  }, wait * 1000,)

  console.log(`Will start boarding in ${wait} seconds`)
}

const perGroup = 1000
boardPassengers(180, 3)

// setTimeout(function(){
//   console.log('Timer')
// }, 1000,)