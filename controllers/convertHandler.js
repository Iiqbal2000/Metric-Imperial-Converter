function ConvertHandler() {
  
  // 121 (valid)
  // 1.23 (valid)
  // 2/2  (valid)
  // 2.1 / 1 (valid)
  this.getNum = function(input) {
    let arr = input.split('')
    let result = []
    let number
    let slashNumber = 0

    let unit = this.getUnit(input).split('')
    
    if (Number(unit[unit.length - 1])) {
      return null
    }
    
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === '/') {
        slashNumber++
        result.push(arr[i])
        continue
      }

      if (arr[i] === '.') {
        result.push(arr[i])
        continue
      }

      number = Number(arr[i])

      if (isNaN(number)) {
        break
      }

      result.push(arr[i])
    }

    // jika slash double
    if (slashNumber > 1) {
      return null
    }

    // jika valid slash
    if (slashNumber) {
      result = result.join('').split('/')
      let numerator = Number(result[0])
      let denominator = Number(result[1])
      result = parseFloat(numerator) / parseFloat(denominator)
      
      if (isNaN(result)) {
        return null
      }

      return result
    }

    // jika tidak ada number maka default 1
    if (result.length < 1) {
      return 1
    }

    // jika number yg sudah difilter masih tidak valid
    if (isNaN(Number(result.join('')))) {
      return null
    }

    // return valid number
    return Number(result.join(''))
  };
  
  this.getUnit = function(input) {
    let arr = input.split('')
    let count = 0
    let endIndex
    let result;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === '/' || arr[i] === '.') {
        continue
      }
      
      endIndex = Number(arr[i])
      
      if (isNaN(endIndex)) {
        endIndex = i
        break
      }
    }
    
    result = arr.splice(endIndex).join('')

    if(result === 'L' || result === 'l') {
      result = result.toUpperCase()
      return result;
    }
    
    result = result.toLowerCase()
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    // gal -> L
    // L -> gal
    // mi -> km
    // km -> mi
    // lbs -> kg
    // kg -> lbs
    let input = String(initUnit).toLowerCase()
    switch(input) {
      case 'gal':
        result = 'L'
        break
      case 'l':
        result = 'gal'
        break
      case 'mi':
        result = 'km'
        break
      case 'km':
        result = 'mi'
        break
      case 'lbs':
        result = 'kg'
        break
      case 'kg':
        result = 'lbs'
        break
      default:
        result = null
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    let input = String(unit).toLowerCase()
    
    switch(input) {
      case 'gal':
        result = 'gallons'
        break
      case 'l':
        result = 'liters'
        break
      case 'mi':
        result = 'miles'
        break
      case 'km':
        result = 'kilometers'
        break
      case 'lbs':
        result = 'pounds'
        break
      case 'kg':
        result = 'kilograms'
        break
      default:
        result = null
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result

    switch(initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL
        break
      case 'l':
        result = initNum / galToL
        break
      case 'mi':
        result = initNum * miToKm
        break
      case 'km':
        result = initNum / miToKm
        break
      case 'lbs':
        result = initNum * lbsToKg
        break
      case 'kg':
        result = initNum / lbsToKg
        break
      default:
        return null
    }
    // round to 5 decimal
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnitString, returnNum, returnUnitString) {
    let result = `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
