



# Webpack 4

> 🔨 Webpack overview. From Grafikart.fr '[Comprendre Webpack](https://www.youtube.com/watch?v=_KXGVca8uXw&list=PLjwdMgw5TTLVzGXGxEBdjwHXCeYnBb7n8)'. The training was for version 3 but has been updated for version 4 using documentation.
>
> Webpack allows you to break up and modulate Javascript.


![Webpack logo](./src/css/webpack-logo-horizontal.png)

[Webpack](https://webpack.js.org/) is a **module builder**. This is important to understand, as Webpack does not run **during** your page, it runs during your development.

Webpack is a tool wherein you use a **configuration to explain** to the builder **how to load specific things**. You describe to Webpack how to load `*.js` files, or how it should look at `.scss` files, etc. Then, when you run it, it goes into your entry point and walks up and down your program and figures out **exactly** what it needs, in what order it needs it, and what each piece depends on. It will then create **bundles** — as few as possible, as optimized as possible, that you include as the scripts in your application.

Webpack permet de morceler et de moduler Javascript.

## Concepts covered

- Configuration
- Dev mode / prod mode (new in Webpack 4)
- webpack.config.js (several files: common, dev and prod)
- Lazy Loading / Code splitting
- Minification
- Babel
- CSS, Sass, CSS extraction
- Caching
- Url Loader
- Eslint
- Dev Server

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

In **.babelrc.json**:

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

**index.js**

````js
document.getElementById('button').addEventListener('click', function () {
  //Async promise
  import('./print').then(module => {
  const print = module.default;
  print();
  })
})
````

**print.js**

````
console.log('The print.js module has loaded! See the network tab in dev tools...');

export default () => {
  console.log('Button Clicked: Here\'s "some text"!');
};
````

Another exemple that display Web Assembly in client console, in **index.js**:

````js
import('./test.wasm').then(function (module) {
  //wasm script to add a number to 42
 log(module._Z5add42i(20))// Output: 62
}).catch(console.log)
````

### Mode dev and prod

Providing the `mode` configuration option tells webpack to use its built-in optimizations accordingly.

It's new in Webpack 4. So webpack provides a preconfiguration for testing and building.

```
string = 'production': 'none' | 'development' | 'production'
```

**package.json**

````json
  "scripts": {
    "dev": "webpack --mode=development",
    "prod": "webpack --mode=production",
    "serve:dev": "webpack-dev-server --open --mode=development",
    "serve:prod": "webpack-dev-server --open --mode=production"
  },
````

We can still use a *webpack.config.js* file. 

Here is an exemple with several configs according to the mode dev or prod, with a common part.

```diff
 webpack-demo
  |- package.json
  |- webpack.config.js
+ |- index.html
+ |- /config
+   |- webpack.common.js
+   |- webpack.development.js
+   |- webpack.production.js
+ |- /build (prod)
+   |- main.js
+ |- /dist (dev)
+   |- main.js
+ |- /src
+   |- index.js
```

**webpack.config.js**

````js
const { merge } = require('webpack-merge');
const commonConfig = require('./config/webpack.common');

module.exports = (env, options) => {
  const config = require(`./config/webpack.${options.mode}`);
  return merge(commonConfig, config);
};
````

**config/webpack.common.js**

````js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: ['./src/css/app.scss', './src/index.js']
        //the entry is the name given to the files in build, here 'main'
    },
    plugins: [
      new HtmlWebpackPlugin({
        hash: true,
        title: 'Webpack overview',
        myPageHeader: 'Webpack overview',
        myEnv: 'Webpack environment: ',
        template: './src/template.html',
        filename: './index.html' //relative to root of the application
      })
    ],
};
````

**config/webpack.development.js**

````js
const path = require("path");

//Configuration
module.exports = {
  watch: true,
  mode: 'development',
	output: {
    path: path.resolve(__dirname, '..', "dist"),
    filename: '[name].js',
    publicPath: '/dist/'
  },
  devtool: "eval-cheap-module-source-map",
  plugins: [

  ],//\plugins*/
	module: {
        rules: [
    	//...
        ]//\rules
  }//\modules
}//\module export


````

**config/webpack.production.js**

````js
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
//...

//Configuration
module.exports = {
  watch: true,
  mode: 'production',
	output: {
    path: path.resolve(__dirname, '..', "build"),
    filename: '[name].[chunkhash:8].js',
    //Cache invalidation can be achieved by including a hash to the filenames
    publicPath: '/build/'
  },
  devtool: "source-map",
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].css',
    }),
    new TerserPlugin({
      sourceMap: true
    }),
	//...
  ],//\plugins
	module: {
        rules: [
          //..
        ]//\rules
  }//\modules
}//\module export
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

**webpack.config.js**

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
**.babelrc.json**

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

#### Preprocessor CSS (SASS): [css-loader](https://webpack.js.org/loaders/css-loader/), [style-loader](https://webpack.js.org/loaders/style-loader/), [sass-loader](https://webpack.js.org/loaders/sass-loader/)

**Css loader**: *convert css to strings*

`npm install --save-dev css-loader`

**Style loader**: *inject strings into style tags*

`npm install --save-dev style-loader`

**Sass loader** and node-sass: *to use css preprocessor, here sass to css*

`npm install --save-dev sass-loader node-sass`

**webpack.config.js**

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

**app.scss**

````scss
$background: #DDD;

body {
    background: $background;
}
````

**index.js**, import scss

````js
import css from './app.scss'
````

SCSS will be automaticaly converted into CSS.

#### Postprocessor CSS (PostCSS): [postcss-loader](https://webpack.js.org/loaders/postcss-loader/)

**PostCSS loader** : *a CSS post-processing tool that can transform your CSS in a lot of  ways, like autoprefixing, linting and more!*

`npm i -D postcss-loader`

If you use plugins, you have to install them.

Exemple:

postcss-preset-env: `npm i postcss-preset-env`

css nano: `npm i cssnano`

**webpack.config.js**

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

**webpack.config.js**

````js
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      }
````

**postcss.config.js**

````js
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

For instance in *webpack.config.js* for production:

````js
module.exports = {
  watch: true,
  mode: 'production',
	//...
  },
  devtool: "source-map",
 }
````



In th browser, disable 'Enable JS source maps'.

Then we can use `console.log` and `debugge` even with the minified build files.

Warning: [UglifyjsWebpackPlugin](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/) is deprecated

#### [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)

*The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles.*

`npm i -D webpack-dev-server html-webpack-plugin`

**webpack.config.js**, exemple with a template call:

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

In **package.json**, for instance with 'start':

````json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --mode production",
    "dev": "webpack --mode development",
    "watch": "Webpack --watch --mode none",
    "start": "webpack-dev-server --mode development --open"
  },
````

Exemple of **template.html**

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

#### [MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)

*This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.*

To use in production.

`npm install --save-dev mini-css-extract-plugin`

**webpack.config.js**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[id].css',
        }),
    ],//\plugins
    module: {
      {
        test: /\.scss$/i,
        sideEffects: true,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/';
              },
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
      }
    ]//\rules
};
```

#### [optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)

*It will search for CSS assets during the Webpack build and will optimize \ minimize the CSS (by default it uses cssnano but a custom CSS processor can be specified).*

`npm install --save-dev optimize-css-assets-webpack-plugin`

**webpack.config.js**

````js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//...
plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].css',
    }),
    new TerserPlugin({
      sourceMap: true
    }),
    new OptimizeCSSAssetsPlugin({})
 ],//\plugins
````



#### [webpack-manifest-plugin](https://www.npmjs.com/package/webpack-manifest-plugin)

*Webpack plugin for generating an asset manifest.*

`npm install --save-dev webpack-manifest-plugin`

If we invalidate cache using hashes (chunckhash, contenthash), name of the files are generated with keys.

This plugin will create a  'manifest.json' that can be useful to manage the names, for instance in backend side.

````js
const ManifestPlugin = require('webpack-manifest-plugin');

plugins: [
    new ManifestPlugin()
 ],//\plugins
````

**manifest.json**

````json
{
  "main.css": "/build/main.96a6baa9.css",
  "main.js": "/build/main.d6f62816.js",
  "main.js.map": "/build/main.d6f62816.js.map",
  "./index.html": "/build/./index.html"
}
````

#### [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin)

*A webpack plugin to remove/clean your build folder(s) before building again.*

`npm install --save-dev clean-webpack-plugin`

````js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

plugins: [
     new CleanWebpackPlugin({
      verbose: true,//log
      dry: false// true = test without delete, false = delete
    })
 ],//\plugins
````



## Useful links

[Webpack 4: comprendre webpack](https://www.grafikart.fr/tutoriels/webpack-4-992)

[Webpack](https://webpack.js.org/)

[What is Webpack and why should I care?](https://medium.com/the-self-taught-programmer/what-is-webpack-and-why-should-i-care-part-1-introduction-ca4da7d0d8dc)

[Webpack 4: mode and optimization](https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a)

[How to split dev/prod webpack configuration](https://dev.to/didof/how-to-split-dev-prod-webpack-configuration-n53)

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



