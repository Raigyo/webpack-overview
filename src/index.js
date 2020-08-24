//Imports
import {log, hello} from './log'//destructuring
import config from './config'//use relative path otherwise it will link to node modules
import '@babel/polyfill'


//Import of a json+use of an imported module (config json)
log(hello(config.name));// Output: Hello Vincent
log("config.cache: "+config.cache); // Output: config.cache:true

//Exemple of Babel converting let to var in main.js
let a = "people!"
log(hello(a))// Output: Hello people!
let [b,,c] = [1,2,4,5]
log(b);// Output: 1

//Webassembly /asynchronous
import('./test.wasm').then(function (module) {
  //wasm script to add a number to 42
 log(module._Z5add42i(20))// Output: 62
}).catch(console.log)