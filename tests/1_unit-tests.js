const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('read a whole number input', (done) => {
    const input = '23l';
    assert.equal(convertHandler.getNum(input), 23);
    done()
  })

  test('read a decimal number input', (done) => {
    const input = '2.3l';
    assert.equal(convertHandler.getNum(input), 2.3);
    done()
  })

  test('read a fractional input', (done) => {
    const input = '1/2l';
    assert.equal(convertHandler.getNum(input), 0.5);
    done()
  })

  test('read a fractional input with a decimal', (done) => {
    const input = '1.1/2l';
    assert.equal(convertHandler.getNum(input), 0.55);
    done()
  })

  test('return an error on a double-fraction (i.e. 3/2/3)', (done) => {
    const input = '3/2/3l';
    assert.equal(convertHandler.getNum(input), null);
    done()
  })

  test('default to a numerical input of 1 when no numerical input is provided', (done) => {
    const input = 'l';
    assert.equal(convertHandler.getNum(input), 1);
    done()
  })

  test('read each valid input unit', (done) => {
    const arrInput = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    arrInput.forEach((val) => {
      assert.equal(convertHandler.getUnit(`2${val}`), val === 'l' || val === 'L' ? val.toUpperCase() : val.toLowerCase());
    })
    done()
  })

  test('return an error for an invalid input unit', (done) => {
    const input = '3pounds';
    assert.equal(convertHandler.getReturnUnit(input), null);
    done()
  })

  test('return correct return unit for each valid input unit', (done) => {
    const input = ['gal','L','mi','km','lbs','kg'];
    const expect = ['L','gal','km','mi','kg','lbs'];
    input.forEach((val, i) => {
      assert.equal(convertHandler.getReturnUnit(val), expect[i]);
    })
    done()
  })

  test('return the spelled-out string unit for each valid input unit', (done) => {
    const input = ['gal','L','mi','km','lbs','kg'];
    const expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
    input.forEach((val, i) => {
      assert.equal(convertHandler.spellOutUnit(val), expect[i]);
    })
    done()
  })

  test('convert gal to L', (done) => {
    const input = [101, 'gal']
    const expect = 382.32641
    assert.approximately(convertHandler.convert(input[0], input[1]), expect, 0.1); 
    done()
  })

  test('convert L to gal', (done) => {
    const input = [10, 'L']
    const expect = 2.64172
    assert.approximately(convertHandler.convert(input[0], input[1]), expect, 0.1); 
    done()
  })

  test('convert mi to km', (done) => {
    const input = [50, 'mi']
    const expect = 80.46700
    assert.approximately(convertHandler.convert(input[0], input[1]), expect, 0.1); 
    done()
  })

  test('convert km to mi', (done) => {
    const input = [8, 'km']
    const expect = 4.97098
    assert.approximately(convertHandler.convert(input[0], input[1]), expect, 0.1); 
    done()
  })

  test('convert lbs to kg', (done) => {
    const input = [11, 'lbs']
    const expect = 4.98951
    assert.approximately(convertHandler.convert(input[0], input[1]), expect, 0.1); 
    done()
  })

  test('convert kg to lbs', (done) => {
    const input = [27, 'kg']
    const expect = 59.52486
    assert.approximately(convertHandler.convert(input[0], input[1]), expect, 0.1); 
    done()
  })

});