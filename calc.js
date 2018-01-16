var legend = require('./primes')
var ffs = {"1":[]}

// turn all factorials below 5001! into prime factor arrays
for (var i = 2; i <= 5000; i++) {
  var start = ffs[i-1]
  var facts = pFactorize(i)
  var next = add(start, facts)
  ffs[i] = next
}

var strTop = "19! * 50! * 72 *77 * 35990 * 16226709967 *10000"
var strBot = "70!"
var arrTop = strTop.replace(/ /g,'').replace(/x/g,'*').split('*').map(parseEntry).reduce(add)
console.log(arrTop)
// var arrBot = strBot.replace(/ /g,'').replace(/x/g,'*').split('*').map(parseEntry).reduce(add)
// var sol = divideOut(arrTop, arrBot).map(function(a){
//   return transform(a)
// })
// console.log(sol.join('\n----------------------\n'))

// parseEquation(equation :string) :number[]
function parseEquation(equation){
  return equation.replace(/ /g,'').replace(/x/g,'*')
    .split('*').map(parseEntry).reduce(add)
}

// parseEntry(entry :string) :number[]
function parseEntry(entry){
  if(!+entry){
    var ff = entry.replace(/!/,'')
    return ffs[ff]
  }else{
    return pFactorize(+entry)
  }
}

// add(a :number[], b :number[]) :number[]
function add(a,b){
  var added = []
  var max = Math.max(a.length, b.length)
  for (var j = 0; j < max; j++) {
    added[j] = (a[j]||0) + (b[j]||0)
  }
  return added
}

// divideOut(numerator :number[], denominator :number[]) :[number[], number[]]
function divideOut(numerator, denominator){
  numerator = numerator.slice()
  denominator = denominator.slice()
  var max = Math.max(numerator.length, denominator.length)
  for (var j = 0; j < max; j++) {
    var nj = numerator[j]
    var dj = denominator[j]
    var min = Math.min(nj, dj) || 0
    numerator[j] = (nj - min) || 0
    denominator[j] = (dj - min) || 0
  }

  return [numerator, denominator]
}

// removeTens(arr :number[]) :string
function removeTens(arr){
  var tens = Math.min(arr[0], arr[2]) || 0
  arr[0] = arr[0] - tens
  arr[2] = arr[2] - tens
  if(tens){
    return ' * 1e' + tens
  }else{
    return ''
  }
}

// transform(arr :number[], groupTens? :boolean, fixed? :boolean) :string
function transform(arr, groupTens, fixed){
  arr = arr.slice()
  var tens = groupTens? removeTens(arr) : ''
  if(fixed){
    for (var i = 0; i < arr.length; i++) {
      arr[i] = Math.pow(legend[i],arr[i]||NaN)
    }
  } else {
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i]? legend[i]+'^'+arr[i] : NaN
    }
  }
  return (arr.filter(function(a){return a})
    .join(' * ') || '1') + tens
}

// pFactorize(n :number) :number[]
function pFactorize(n){
  var factors = []
  // quickly run through an array of early primes
  for( var prime of legend){
    if(n === 1){break;}
    var amount = 0
    while(n%prime === 0){
      n = n/prime
      amount++
    }
    factors.push(amount)
  }
  // brute force remaining primes
  var next = prime + 2
  while (n !== 1) {
    if (_isPrime(next)) {
      var amount = 0
      while(n%next === 0){
        n = n/next
        amount++
      }
      factors.push(amount)
    }
    next+=2
  }

  return factors
}

function choose(n,k) {
  // n!/(n-k)!*k!
}

function _isPrime(number) {
    if (number % 2 < 1) {
      return false
    }
    if (number % 10 === 5 && number !== 5 ){
      return false
    }
    var start = 3;
    while (start <= Math.sqrt(number)) {
        if (number % start < 1) return false;
        start+=2
    }
    return number > 1;
}

module.exports = {
  add: add,
  divideOut: divideOut,
  parseEntry: parseEntry,
  parseEquation: parseEquation,
  pFactorize: pFactorize,
  removeTens: removeTens,
  transform: transform,
}
module.exports.EVAL_FORMAT = false
module.exports.EXP_FORMAT = true
