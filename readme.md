



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

## Techniques

#### Lazy Loading / Code splitting

Allows deferred loading for some file to improve performances or if we don't always need a component. This practice essentially involves splitting your code at logical breakpoints, and then loading it once the user has done something that requires, or will require, a new block of code. This speeds up the initial load of the application and lightens its overall weight as some blocks may never even be loaded.

Use this plugin for dynamic imports:

`npm i -D babel-plugin-syntax-dynamic-import`

In .babelrc.json:

````json
{
	"presets": [
		["@babel/preset-env", {
			"useBuiltIns": "entry",
			"modules": false,
			"debug":true
		}]
	],
	"plugins": ["syntax-dynamic-import"]
}
````

Exemple with an external component displaying a console log:

index.js

````js
document.getElementById('button').addEventListener('click', function () {
  //Async promise
  import('./print').then(module => {
  const print = module.default;
  print();
  })
})
````

print.js

````
console.log('The print.js module has loaded! See the network tab in dev tools...');

export default () => {
  console.log('Button Clicked: Here\'s "some text"!');
};
````

Another exemple that display Web Assembly in client console:

````js
import('./test.wasm').then(function (module) {
  //wasm script to add a number to 42
 log(module._Z5add42i(20))// Output: 62
}).catch(console.log)
````



## Packages

### Modules / Loaders

Webpack enables use of [loaders](https://webpack.js.org/loaders/) to preprocess files. This allows you to bundle any static resource way beyond JavaScript. 

#### Babel: [babel-loader](https://webpack.js.org/loaders/babel-loader/)

*Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code (ex: JSX) into a backwards compatible version of JavaScript (vanilla) in current and older browsers or environments.*

````
npm install --save-dev @babel/core @babel/register @babel/preset-env babel-loader
npm install --save  @babel/polyfill
````

webpack.config.js

````js
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

#### Preprocessor CSS (SASS): [css-loader](https://webpack.js.org/loaders/css-loader/), [style-loader](https://webpack.js.org/loaders/style-loader/), [sass-loader](https://webpack.js.org/loaders/sass-loader/), [postcss-loader](https://webpack.js.org/loaders/postcss-loader/)

**Css loader**: convert css to strings

`npm install --save-dev css-loader`

**Style loader**: inject strings into style tags

`npm install --save-dev style-loader`

**Sass loader** and node-sass: to use css preprocessor, here sass to css

`npm install --save-dev sass-loader node-sass`

webpack.config.js

````js
	module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
            //loader on the right loaded first, respect the logical order
          },
          {
            test: /\.scss$/i,
            use: ['style-loader', 'css-loader', 'sass-loader'],
          }
        ]
  }
````

app.scss

````scss
$background: #DDD;

body {
    background: $background;
}
````

index.js, import scss

````js
import css from './app.scss'
````

SCSS will be automaticaly converted into CSS.

#### Postprocessor CSS (PostCSS): [postcss-loader](https://webpack.js.org/loaders/postcss-loader/)

**PostCSS loader** : a CSS post-processing tool that can transform your CSS in a lot of  ways, like autoprefixing, linting and more!

`npm i -D postcss-loader`

If you use plugins, you have to install them.

Exemple:

postcss-preset-env: `npm i postcss-preset-env`

css nano: `npm i cssnano`

webpack.config.js

````js
      {
        test: /\.scss$/i,
        //use: ['style-loader', 'css-loader', 'sass-loader'],
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('postcss-preset-env')({
                  browsers: "last 2 versions",
                  stage: 3,
                  features: {
                    "nesting-rules": true
                  }
                }),
                require('cssnano')(),
              ],
            }
          },
          'sass-loader'
        ],
      }
````

or with an external config file:

webpack.config.js

````
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      }
````

postcss.config.js

````
module.exports = {
  plugins: {
    'postcss-preset-env': {
      browsers: 'last 2 versions',
      stage: 3,
      features: {
        "nesting-rules": true
      }
    },
    cssnano: {},
  },
};
````



### Plugins

Webpack has a rich [plugin](https://webpack.js.org/plugins/) interface. Most of the features within webpack itself use this plugin interface. This makes webpack flexible.

#### [TerserWebpackPlugin](https://webpack.js.org/plugins/terser-webpack-plugin/)

*Minify code*

`npm i terser-webpack-plugin --save-dev`

It's generally a good practice to minify and combine your assets (Javascript & CSS) when deploying to production. This process reduces the size of your assets and dramatically improves your website's load time. Source maps create a map from these compressed asset files back to the source files.

Whe will use [**Devtool**](https://webpack.js.org/configuration/devtool/)  to control if and how **source maps** are generated.

For instance in *webpack.config.js:* `devtool: dev ? "eval-cheap-module-source-map" : "source-map",`

In th browser, disable 'Enable JS source maps'.

Then we can use `console.log` and `debugger`even with the minified build files.

Warning: [UglifyjsWebpackPlugin](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/) is deprecated

#### [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)

*The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles.*

`npm i -D webpack-dev-server html-webpack-plugin`

Then in root create 'webpack.config.js', exemple with a template call:

```` js
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    new HTMLPlugin({
      hash: true,
      title: 'My Awesome application',
      myPageHeader: 'Hello World',
      template: './src/template.html',
      filename: './index.html' //relative to root of the application
    })
  ]
}
````

In 'package.json, for instance with 'start':

````json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --mode production",
    "dev": "webpack --mode development",
    "watch": "Webpack --watch --mode none",
    "start": "webpack-dev-server --mode development --open"
  },
````

Exemple of template.html

````html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>

  <body>
    <h1> <%= htmlWebpackPlugin.options.myPageHeader %> </h1>
    <h3>Welcome to the Awesome application</h3>

    <my-app></my-app>

  </body>
</html>
````

then: `npm run start` / http://localhost:8080/ 









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

[using html-webpack-plugin to generate index.html](https://medium.com/a-beginners-guide-for-webpack-2/index-html-using-html-webpack-plugin-85eabdb73474)

[PostCSS Preset Env: Babel for CSS](https://dev.to/adrianbdesigns/postcss-preset-env-babel-for-css-12hp)

[npm-install](https://docs.npmjs.com/cli/install)

[Comprendre WebAssembly en 5 minutes](https://www.jesuisundev.com/comprendre-webassembly-en-5-minutes/)



