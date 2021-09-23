'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const { input } = req.query
    
    let initNum = convertHandler.getNum(input)
    let initUnit = convertHandler.getUnit(input)
    let returnNum = convertHandler.convert(initNum, initUnit)
    let returnUnit = convertHandler.getReturnUnit(initUnit)
    let initUnitString = convertHandler.spellOutUnit(initUnit)
    let returnUnitString = convertHandler.spellOutUnit(returnUnit)
    
    if (!initNum && !returnUnit) {
      return res.send('invalid number and unit')
    }

    if (!initNum) {
      return res.send('invalid number')
    }
    
    if (!returnUnit) {
      return res.send('invalid unit')
    }

    let str = convertHandler.getString(initNum, initUnitString, returnNum, returnUnitString)

    res.send({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: str
    })
  })
};
