Webpack(v4.31.0)

- install webpack 
 	- npm i webpack -g  
	- npm i webpack -D (npm install webpack --save-dev)

	
- use command line to build file
	- webpack --entry ./src/app.js --output ./dist/app.bundle.js (default mode is production)
	- webpack --entry ./src/app.js --output ./dist/app.bundle.js --mode development
	
	
	- -d: source maps
	- --watch: start webpack's Watch Mode

- use cofing to build file
	- create webpack.config.js to your project root path
	- basic config
		
		```
		module.exports = {
		  entry: './src/app.js',
		  output: {
    	 	 filename: './app.bundle.js'
  		  }
		};
		```	
		
- html-webpack-plugin: generate a index.html file which auto import your bundle file

	```
	//webpack.config.js
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	module.exports = {
		  entry: './src/app.js',
		  output: {
		    filename: './app.bundle.js'
		  },
		  plugins: [
		    new HtmlWebpackPlugin({title: "React Awesome"})
		  ]
	};
	```
	
	```
	// dist/index.html
	
	<!DOCTYPE html>
	<html>
	<head>
	    <meta charset="UTF-8">
	    <title>React Awesome</title>
	</head>
	<body>
		<script type="text/javascript" src="./app.bundle.js"></script></body>
	</html>
	```	
	
		
	- html-webpack-plugin can generate a index.html file from a template html file
	
	```
	// src/index.template.html
	<!DOCTYPE html>
	<html>
	<head>
	    <meta charset="UTF-8">
	    <title>React Awesome</title>
	</head>
	<body>
		<div id="app"></div>
	</body>
	</html>
	```
	
	```
	// webpack.config.js
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	module.exports = {
	  entry: './src/app.js',
	  output: {
	    filename: './app.bundle.js'
	  },
	  plugins: [
	    new HtmlWebpackPlugin({
	      template: './src/index.template.html'
	    })
	  ]
	};
	```
	
	```
	// dist/index.html
	<!DOCTYPE html>
	<html>
	<head>
	    <meta charset="UTF-8">
	    <title>React Awesome</title>
	</head>
	<body>
	<div id="app"></div>
	<script type="text/javascript" src="./app.bundle.js"></script></body>
	</html>
	```
	- `minify` and `hash`

		`minify`: remove space in the index.html to reduce size
		
		`hash`: add hash code to the bundle file source path, to solve cache problem
	
	 ```
	// webpack.config.js
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	module.exports = {
		  entry: './src/app.js',
		  output: {
		    filename: './app.bundle.js'
		  },
		  plugins: [
		    new HtmlWebpackPlugin({
		      template: './src/index.template.html',
		      minify: {
	     		   collapseWhitespace: true,
	   		 },
	    		 hash: true,
		    })
		  ]
	};
	```
	```
	// dist/index.html
	<!DOCTYPE html><html><head><meta charset="UTF-8"><title>React Awesome</title></head><body><div id="app"></div><script type="text/javascript" src="./app.bundle.js?b9554845788a6b4fd584"></script></body></html>
	```
- loader
	loader can convert typescript/es6 to es5, and convert scss/less to css, and convert inline image to a data URL 
	
	- css-loader and style-loader

	```
	// src/app.css
	body {
   	 background: #000;
	}	
	```
	
	```
	// src/app.js
	import css from './app.css';

	console.log('hello webpack');
	```
	
	In default, webpack can't handle css file in js, there is error like:
	
	```
	ERROR in ./src/app.css 1:5
Module parse failed: Unexpected token (1:5)
You may need an appropriate loader to handle this file type.
> body {
|     background: #000;
| }
 @ ./src/app.js 1:0-28

	```	
	
	now use css-loader and style loader
	
	`npm install -D css-loader style-loader`
	
	```
	// webpack.config.js
	const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/app.js',
  output: {
    filename: './app.bundle.js'
  },
  module:  {
    rules: [{
      test: /\.css/,
      use: ['style-loader', 'css-loader']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.template.html',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
    })
  ]
};
	```
	now app.bundle.js contains the css.
	
	- sass-loader: compile sass to css
	
	rename `src/app.css` to `src/app.scss`, there is error:
	
	```
	ERROR in ./src/app.scss 1:5
Module parse failed: Unexpected token (1:5)
You may need an appropriate loader to handle this file type.
> body {
|     background: deeppink;
| }
 @ ./src/app.js 1:0-29

	```
	
	`npm install -D sass-loader node-sass`
	
	```
	// webpack.config.js
	const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	  entry: './src/app.js',
	  output: {
	    filename: './app.bundle.js'
	  },
	  module:  {
	    rules: [{
	      test: /\.scss/,
	      use: ['style-loader', 'css-loader', 'sass-loader']
	    }]
	  },
	  plugins: [
	    new HtmlWebpackPlugin({
	      template: './src/index.template.html',
	      minify: {
	        collapseWhitespace: true,
	      },
	      hash: true,
	    })
	  ]
};
	```
	
- mini-css-extract-plugin
	
	split css into different file when compile, we can use `mini-css-extract-pluginn`
	
	`npm install -D mini-css-extract-plugin`
	
	```
	// webpack.config.js
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	const MiniCssExtractPlugin = require('mini-css-extract-plugin');
	module.exports = {
		  entry: './src/app.js',
		  output: {
		    filename: './app.bundle.js'
		  },
		  module:  {
		    rules: [{
		      test: /\.scss/,
		      use: [{
			loader: MiniCssExtractPlugin.loader,
		      }, 'css-loader', 'sass-loader'] //remove style-loader
		    }]
		  },
		  plugins: [
		    new HtmlWebpackPlugin({
		      template: './src/index.template.html',
		      minify: {
			collapseWhitespace: false,
		      },
		      hash: true,
		    }),
		    new MiniCssExtractPlugin({
		      filename: '[contenthash].css'
		    })
		  ]
	};
	```
	
	```
	// dist/index.html
	<!DOCTYPE html>
	<html>
	<head>
	    <meta charset="UTF-8">
	    <title>React Awesome</title>
	    <link href="2205bd2207f462192398.css?7f4d8f6394aa4999c100" rel="stylesheet">
		</head>
		<body>
			<div id="app"></div>
			<script type="text/javascript" src="./app.bundle.js?7f4d8f6394aa4999c100"></script>
		</body>
	</html>
	```
	
- webpack-dev-server

	Use webpack with a development server that provides live reloading. This should be used for development only.

	```
		npm i -g webpack-dev-server
		npm i -D webpack-dev-server
	```
	
	excute command `webpack-dev-server`, will start the local server at the default port `8080`
	
	change the default port to `9000` and auto open the browser after compile sucessfully
	
	```
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	const MiniCssExtractPlugin = require('mini-css-extract-plugin');
	module.exports = {
		  entry: './src/app.js',
		  output: {
		    filename: './app.bundle.js'
		  },
		  devServer: {
		    port: 9000,
		    open: true
		  },
		  module:  {
		    rules: [{
		      test: /\.scss/,
		      use: [{
			loader: MiniCssExtractPlugin.loader,
		      }, 'css-loader', 'sass-loader']
		    }]
		  },
		  plugins: [
		    new HtmlWebpackPlugin({
		      template: './src/index.template.html',
		      minify: {
			collapseWhitespace: false,
		      },
		      hash: true,
		    }),
		    new MiniCssExtractPlugin({
		      filename: '[contenthash].css'
		    })
		  ]
	};
	```

- use webpack and babel to config react development environment

	`npm i -D react react-dom`
	
	`npm i -D @babel/core @babel/preset-env @babel/preset-react`
	
	`npm i -D babel-loader`
	
	`preset-react` handle the conversion of React to Javascript
	
	`preset-env` convert es5+ to es5
	
	`touch .babelrc`
	
	```
	// .babelrc
	{
 	 "presets": ["@babel/react","@babel/env"]
	}
	```
	
	```
	// src/Root.jsx
	
	import React from 'react';

	const Root = () => (<div style={{textAlign: 'center'}}><h1>Hello Webpack</h1></div>);
	
	export default Root;
	```
	
	```
	// src/app.js
	import css from './app.scss';
	import othercss from './other.scss';
	
	import React from 'react';
	import ReactDOM from 'react-dom';
	import Root from './Root.jsx';
	
	ReactDOM.render(<Root/>, document.getElementById('app'));
	```
	```
	// webpack.config.js
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	module.exports = {
		  entry: './src/app.js',
		  output: {
		    filename: './app.bundle.js'
		  },
		  devServer: {
		    port: 9000,
		    open: true
		  },
		  module:  {
		    rules: [{
		      test: /\.scss/,
		      use: ['style-loader', 'css-loader', 'sass-loader']
		    }, {
		      test: /\.jsx$/,
		      loader: 'babel-loader',
		      exclude: /node_modules/,
		    }, {
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
		    }]
		  },
		  plugins: [
		    new HtmlWebpackPlugin({
		      template: './src/index.template.html',
		      minify: {
			collapseWhitespace: false,
		      },
		      hash: true,
		    })
		  ]
	};
	```
	
- CleanWebpackPlugin

	clear files in dist or build folder before compile
	
	```
	npm i -D CleanWebpackPlugin
	```
	
	```
	// webpack.config.js
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	const CleanWebpackPlugin = require('clean-webpack-plugin');
	
	module.exports = {
		  entry: {
		    'app.bundle': './src/app.js'
		  },
		  output: {
		    filename: '[name].[chunkhash].js'
		  },
		  devServer: {
		    port: 9000,
		    open: true
		  },
		  module:  {
		    rules: [{
		      test: /\.scss/,
		      use: ['style-loader', 'css-loader', 'sass-loader']
		    }, {
		      test: /\.jsx$/,
		      loader: 'babel-loader',
		      exclude: /node_modules/,
		    }, {
		        test: /\.js$/,
		        loader: 'babel-loader',
		        exclude: /node_modules/,
		    }]
		  },
		  plugins: [
		    new HtmlWebpackPlugin({
		      template: './src/index.template.html',
		      minify: {
		        collapseWhitespace: false,
		      },
		    }),
		    new CleanWebpackPlugin()
		  ]
	};
	```
	
	- Hot Module Replacement
	 
	```
	// webpack.config.js
	const webpack = require('webpack');
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	const CleanWebpackPlugin = require('clean-webpack-plugin');
	
	module.exports = {
	  entry: {
	    'app.bundle': './src/app.js'
	  },
	  output: {
	    filename: '[name].[hash].js' //can't use chunkhash
	  },
	  devServer: {
	    port: 9000,
	    open: true,
	    hot: true,
	  },
	  module:  {
	    rules: [{
	      test: /\.scss/,
	      use: ['style-loader', 'css-loader', 'sass-loader']
	    }, {
	      test: /\.jsx$/,
	      loader: 'babel-loader',
	      exclude: /node_modules/,
	    }, {
	        test: /\.js$/,
	        loader: 'babel-loader',
	        exclude: /node_modules/,
	    }]
	  },
	  plugins: [
	    new HtmlWebpackPlugin({
	      template: './src/index.template.html',
	      minify: {
	        collapseWhitespace: false,
	      },
	    }),
	    new CleanWebpackPlugin(),
	    new webpack.NamedModulesPlugin(),
	    new webpack.HotModuleReplacementPlugin(),
	  ]
	};
	```
	
- pack images
	
	use `file-loader` and `html-loader` to pack the images

	------------------------------------------
	
	```
	npm i -D file-loader
	```
	
	```
	// src/Root.jsx
	import React from 'react';

	const Root = () => (
		<div style={{textAlign: 'center'}}>
		  <img alt='load failed' src='images/hotpot-train.gif'/>
		  <h1>Hello Webpack</h1>
		  <h1 style={{color: 'black'}}>Hello Webpack</h1>
		</div>
	);
	
	export default Root;
	```
	```
	// webpack.config.js
	const webpack = require('webpack');
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	const CleanWebpackPlugin = require('clean-webpack-plugin');
	
	module.exports = {
	  entry: {
	    'app.bundle': './src/app.js'
	  },
	  output: {
	    filename: '[name].[hash].js'
	  },
	  devServer: {
	    port: 9000,
	    open: true,
	    hot: true,
	  },
	  module:  {
	    rules: [{
	      test: /\.scss/,
	      use: ['style-loader', 'css-loader', 'sass-loader']
	    }, {
	      test: /\.jsx$/,
	      loader: 'babel-loader',
	      exclude: /node_modules/,
	    }, {
	        test: /\.js$/,
	        loader: 'babel-loader',
	        exclude: /node_modules/,
	    }, {
	      test: /\.gif$/,
	      loader: 'file-loader',
	      options: {
	        name: '[name].[ext]',
	        outputPath: './images/'
	      }
	    }]
	  },
	  plugins: [
	    new HtmlWebpackPlugin({
	      template: './src/index.template.html',
	      minify: {
	        collapseWhitespace: false,
	      },
	    }),
	    new CleanWebpackPlugin(),
	    new webpack.NamedModulesPlugin(),
	    new webpack.HotModuleReplacementPlugin(),
	  ]
	};
	```
	----------------------------------
	```
	npm i -D file-loader
	npm i -D html-loader
	```
	add file `hotpot.gif` and `hotpot-train.gif` to src/images folder
	```
	// src/other.scss
	body {
	  color: white;
	}
	
	.hotpot {
	  background: url("./images/hotpot.gif");
	  height: 332px;
	}
	
	.hotpot-train {
	  background: url("./images/hotpot-train.gif");
	  height: 332px;
	}
	```
	
	```
	// src/Root.jsx
	import React from 'react';

	const Root = () => (
		<div style={{textAlign: 'center'}}>
		  <div className='hotpot-train'/>
		  <h1>Hello Webpack</h1>
		  <h1 style={{color: 'black'}}>Hello Webpack</h1>
		  <div className='hotpot'/>
		</div>
	);
	
	export default Root;
	```

	```
	// webpack.config.js
	const webpack = require('webpack');
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	const CleanWebpackPlugin = require('clean-webpack-plugin');
	
	module.exports = {
	  entry: {
	    'app.bundle': './src/app.js'
	  },
	  output: {
	    filename: '[name].[hash].js'
	  },
	  devServer: {
	    port: 9000,
	    open: true,
	    hot: true,
	  },
	  module:  {
	    rules: [{
	      test: /\.scss/,
	      use: ['style-loader', 'css-loader', 'sass-loader']
	    }, {
	      test: /\.jsx$/,
	      loader: 'babel-loader',
	      exclude: /node_modules/,
	    }, {
	        test: /\.js$/,
	        loader: 'babel-loader',
	        exclude: /node_modules/,
	    }, {
	      test: /\.gif$/,
	      loader: 'file-loader',
	      options: {
	        name: '[name].[ext]',
	        outputPath: 'images/'
	      }
	    },
	      {
	      test: /\.html$/,
	      use: [{
	        loader: 'html-loader',
	        options: {
	          minimize: true
	        }
	      }],
	    }
	    ]
	  },
	  plugins: [
	    new HtmlWebpackPlugin({
	      template: './src/index.template.html',
	      minify: {
	        collapseWhitespace: false,
	      },
	    }),
	    new CleanWebpackPlugin(),
	    new webpack.NamedModulesPlugin(),
	    new webpack.HotModuleReplacementPlugin(),
	  ]
	};
	```
