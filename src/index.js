//Imports
import {log, hello} from './log';//destructuring
import config from './config';//use relative path otherwise it will link to node modules
import '@babel/polyfill';

//Display environment on html template
const displayEnv = String(process.env.NODE_ENV);
document.querySelector("#display-env").innerHTML = displayEnv;

//Import of a json+use of an imported module (config json)
log(hello(config.name));// Output: Hello Vincent
log("config.cache: "+config.cache); // Output: config.cache:true

//Lazy Loading / Code spliting /asynchronous
//Exemple with print.js (loading a module displaying a console log when clicking button)
document.getElementById('button').addEventListener('click', function () {
  //Async promise
  import('./print').then(module => {
  const print = module.default;
  print();
  })
})
//Exemple with Webassembly
//Async promise
import('./test.wasm').then(function (module) {
  //wasm script to add a number to 42
 log(module._Z5add42i(20))// Output: 62
}).catch(console.log)

//Exemple of Babel converting let to var in main.js
let a = "people!"
log(hello(a))// Output: Hello people!
let [b,,c] = [1,2,4,5]
log(b);// Output: 1