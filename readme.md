



# Webpack 4

> 🔨 Webpack overview. From Grafikart.fr '[Comprendre Webpack](https://www.youtube.com/watch?v=_KXGVca8uXw&list=PLjwdMgw5TTLVzGXGxEBdjwHXCeYnBb7n8)'. The training was for version 3 but has been updated for version 4 using documentation.
>
> Webpack allows you to break up and modulate Javascript.



[Webpack](https://webpack.js.org/) is a **module builder**. This is important to understand, as Webpack does not run **during** your page, it runs during your development.

Webpack is a tool wherein you use a **configuration to explain** to the builder **how to load specific things**. You describe to Webpack how to load `*.js` files, or how it should look at `.scss` files, etc. Then, when you run it, it goes into your entry point and walks up and down your program and figures out **exactly** what it needs, in what order it needs it, and what each piece depends on. It will then create **bundles** — as few as possible, as optimized as possible, that you include as the scripts in your application.

Webpack permet de morceler et de moduler Javascript.

## Install Webpack

### Init project

`npm init -y`

`npm i -D webpack webpack-cli`

Structure:

```diff
 webpack-demo
  |- package.json
+ |- index.html
+ |- /src
+   |- index.js
```

### Compile

- Use:

`./node_modules/.bin/webpack`

- Or in package.json:

````` json
"scripts": {

  "test": "echo \"Error: no test specified\" && exit 1",

  "build": "webpack --mode=production",

  "dev": "webpack --mode=development"

 },
`````

Then:

`npm run dev` / `npm run build`

- Or if installed globally use:

`webpack`

NB: it's not a good practise to install it globally.



Will create a 'dist' folder:

```diff
 webpack-demo
  |- package.json
+ |- index.html
+ |- /dist
+   |- main.js
+ |- /src
+   |- index.js
```



## Packages

### Modules

#### Babel: [babel-loader](https://webpack.js.org/loaders/babel-loader/)

*Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code (ex: JSX) into a backwards compatible version of JavaScript (vanilla) in current and older browsers or environments.*

````
npm install --save-dev @babel/core @babel/register @babel/preset-env babel-loader
npm install --save  @babel/polyfill
````

webpack.config.js

````json
module.exports = {
  	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
			}
		}]
  }
}
````
.babelrc.json

````json
{
	"presets": [
		["@babel/preset-env", {
			"useBuiltIns": "entry",
			"debug":true
		}]
	]
}
````



### Plugins

#### [UglifyjsWebpackPlugin](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/)

*Minify code*

`npm i uglifyjs-webpack-plugin --save-dev`

It's generally a good practice to minify and combine your assets (Javascript & CSS) when deploying to production. This process reduces the size of your assets and dramatically improves your website's load time. Source maps create a map from these compressed asset files back to the source files.

Whe will use **Devtool**  to control if and how source maps are generated.

For instance in *webpack.config.js:* `devtool: dev ? "eval-cheap-module-source-map" : "source-map",`

In th browser, disable 'Enable JS source maps'.

Then we can use `console.log` and `debugger`even with the minified build files.

#### [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)

*The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles.*

`npm i -D webpack-dev-server html-webpack-plugin`

Then in root create 'webpack.config.js' with:

```` js
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
 plugins: [
  new HTMLPlugin()
 ]
}
````

In 'package.json':

````json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --mode production",
    "dev": "webpack --mode development",
    "watch": "Webpack --watch --mode none",
    "start": "webpack-dev-server --mode development --open"
  },
````

then: `npm run dev` / http://localhost:8080/ 









## Useful links

[Webpack](https://webpack.js.org/)

[What is Webpack and why should I care?](https://medium.com/the-self-taught-programmer/what-is-webpack-and-why-should-i-care-part-1-introduction-ca4da7d0d8dc)

[Modularize Your JavaScript with ES6 Modules and Webpack](https://ericslenk.com/modularize-your-javascript-with-es6-modules-and-webpack.html)

[Code Splitting](https://webpack.js.org/guides/code-splitting/)

[Débuter avec Webpack](https://www.alsacreations.com/tuto/lire/1754-debuter-avec-webpack.html)

[A mostly complete guide to webpack (2020)](https://www.valentinog.com/blog/webpack/)

[Les outils pour travailler côté front](https://bts-sio-formation.com/javascript/developpementfront)

[Working with Babel 7 and Webpack](https://www.thebasement.be/working-with-babel-7-and-webpack/)

[Devtool](https://webpack.js.org/configuration/devtool/)

[What are Javascript Source Maps?](https://blog.rapid7.com/2017/05/24/what-are-javascript-source-maps/)

[Comprendre WebAssembly en 5 minutes](https://www.jesuisundev.com/comprendre-webassembly-en-5-minutes/)



