import '@babel/polyfill'

export function log (value) {
  console.log(value)
}

export function hello (name) {
  return 'Hello ' + name
}
//Was:
/*
  module.exports = function hello (name) {
    return 'Hello' + name
  }
*/
//Was called with:
/*
  const hello = require('./hello')
*/
//Now use:
/*
  import {hello} from './hello'
*/
