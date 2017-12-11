var legend = require('./primes')
var ffs = {"1":[]}

for (var i = 2; i <= 5000; i++) {
  var start = ffs[i-1]
  var facts = pFactorize(i)
  var next = add(start, facts)
  ffs[i] = next
}

var strTop = "19! * 50! * 72 *77 * 35990 * 16226709967 *10000"
var strBot = "70!"
var arrTop = strTop.replace(/ /g,'').replace(/x/g,'*').split('*').map(parseEntry).reduce(add)
var arrBot = strBot.replace(/ /g,'').replace(/x/g,'*').split('*').map(parseEntry).reduce(add)
var sol = divideOut(arrTop, arrBot).map(function(a){
  return transform(a)
})
console.log(sol.join('\n----------------------\n'))

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

// divideOut(a :number[], b :number[]) :[number[], number[]]
function divideOut(a,b){
  a = a.slice()
  b = b.slice()
  var max = Math.max(a.length, b.length)
  for (var j = 0; j < max; j++) {
    var aj = a[j]
    var bj = b[j]
    var min = Math.min(aj,bj) || 0
    a[j] = (aj-min)||0
    b[j] = (bj-min)||0
  }
  return [a,b]
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
  for( var prime of legend){
    if(n === 1){break;}
    var amount = 0
    while(n%prime === 0){
      n = n/prime
      amount++
    }
    factors.push(amount)
  }
  return factors
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
