var assert = require('power-assert');
var calc

describe('given factorial-calc', function() {
  it('should have all the files', function(done) {
    calc = require('../calc.js')
    var primes = require('../primes.js')
    assert(primes.length === 669)
    assert(primes[0] === 2)
    assert(primes[primes.length -1] === 4999)
    done()
  });
  it('Should Expose all function', function(done){
    assert(!!calc.add === true, ['calc.add'])
    assert(!!calc.divideOut === true, ['calc.divideOut'])
    assert(!!calc.parseEntry === true, ['calc.parseEntry'])
    assert(!!calc.parseEquation === true, ['calc.parseEquation'])
    assert(!!calc.pFactorize === true, ['calc.pFactorize'])
    assert(!!calc.removeTens === true, ['calc.removeTens'])
    assert(!!calc.transform === true, ['calc.transform'])
    done()
  })
  describe('given add', function() {
    var arr1 = [2, 2, 2, 2]
    var arr2 = [1, 1, 1, 1]
    var arrS = [2, 2]
    var arrL = [1, 1, 3, 3]
    var arrF = [3, 3, 3, 3]
    it('should be able to add two arrays', function(done){
      assert.deepEqual(calc.add(arr1, arr2), arrF)
      done()
    })
    it('should be able to add two arrays regardless of order', function(done){
      assert.deepEqual(calc.add(arr2, arr1), arrF)
      done()
    })
    it('should be able to add two arrays of different length', function(done){
      assert.deepEqual(calc.add(arrS, arrL), arrF)
      done()
    })
    it('should be able to add two arrays of different length regardless of order', function(done){
      assert.deepEqual(calc.add(arrL, arrS), arrF)
      done()
    })
  })

  describe('given divideOut', function() {
    it('should divde-out every value', function(done){
      var arr1 = [2, 2, 2, 2, 2, 2, 2]
      var arr2 = [2, 2, 2, 2, 2, 2, 2]
      var arrF = [0, 0, 0, 0, 0, 0, 0]
      assert.deepEqual(calc.divideOut(arr1, arr2), [arrF, arrF])
      done()
    })

    it('should properly divde-out different values', function(done){
      var arr1 = [5, 5, 5, 5, 5, 5]
      var arr2 = [5, 4, 3, 2, 1, 0]
      var arrF1 = [0, 1, 2, 3, 4, 5]
      var arrF2 = [0, 0, 0, 0, 0, 0]
      assert.deepEqual(calc.divideOut(arr1, arr2), [arrF1, arrF2])
      done()
    })

    it('should not divde-out without common values', function(done){
      var arr1 = [2, 0, 2, 0]
      var arr2 = [0, 2, 0, 2]
      assert.deepEqual(calc.divideOut(arr1, arr2), [arr1, arr2])
      done()
    })

    it('should have order matter', function(done){
      var arr1 = [2, 0, 2, 0]
      var arr2 = [0, 2, 0, 2]
      assert.deepEqual(calc.divideOut(arr2, arr1), [arr2, arr1])
      done()
    })

    it('should work with longer numerator', function(done){
      var arr1 = [2, 2, 2, 2]
      var arr2 = [2, 2]
      var arrF1 = [0, 0, 2, 2]
      var arrF2 = [0, 0, 0, 0]
      assert.deepEqual(calc.divideOut(arr1, arr2), [arrF1, arrF2])
      done()
    })

    it('should work with longer deominator', function(done){
      var arr1 = [2, 2]
      var arr2 = [2, 2, 2, 2]
      var arrF1 = [0, 0, 0, 0]
      var arrF2 = [0, 0, 2, 2]
      assert.deepEqual(calc.divideOut(arr1, arr2), [arrF1, arrF2])
      done()
    })
  })
  describe('given pFactorize', function() {
    it('should turn numbers into a prime factor arrays', function(done){
      var n1 = 30
      var parr1 = [1, 1, 1]
      var n2 = 7
      var parr2 = [0, 0, 0, 1]
      assert.deepEqual(calc.pFactorize(n1), parr1 )
      assert.deepEqual(calc.pFactorize(n2), parr2 )
      done()
    })
    it('should handle large numbers', function(done){
      var n1 = 16226709967
      var parr1 = [0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1]
      assert.deepEqual(calc.pFactorize(n1), parr1 )
      done()
    })
  })
  describe('given parseEntry', function() {
    it('should turn number strings into primes factor arrays', function(done) {
      var n1 = '30'
      var parr1 = [1, 1, 1]
      var n2 = '7'
      var parr2 = [0, 0, 0, 1]
      assert.deepEqual(calc.parseEntry(n1), parr1 )
      assert.deepEqual(calc.parseEntry(n2), parr2 )
      done()
    })
    it('should turn factorial strings into primes factor arrays', function(done) {
      var n1 = '30!'
      var parr1 = [26, 14, 7, 4, 2, 2, 1, 1, 1, 1]
      var n2 = '7!'
      var parr2 = [4, 2, 1, 1]
      assert.deepEqual(calc.parseEntry(n1), parr1 )
      assert.deepEqual(calc.parseEntry(n2), parr2 )
      done()
    })
  })
  describe('given parseEquation', function() {
    var parr1 = [71, 32, 20, 11, 6, 5, 4, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1]
    it('should turn equations into primes factor arrays', function(done) {
      var eq1 = "19!*50!*72*77*35990*16226709967*10000"
      assert.deepEqual(calc.parseEquation(eq1), parr1 )
      done()
    })

    it('should not care about whitespace', function(done) {
      var eq1 = "   19!  *50! * 72   *  77*35990*    16226709967*   10000 "
      assert.deepEqual(calc.parseEquation(eq1), parr1 )
      done()
    })

  })
});
