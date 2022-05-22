// depreciated method using hot-relaod and not fast reload
// const path = require("path");
// const webpack = require("webpack");

// module.exports = {
// 	entry: "./src/index.js",
// 	mode: "development",
// 	module: {
// 		rules: [
// 			{
// 				test: /\.(js|jsx)$/,
// 				exclude: /(node_modules|bower_components)/,
// 				loader: "babel-loader",
// 				options: { presets: ["@babel/env"] }
// 			},
// 			{
// 				test: /\.css$/,
// 				use: ["style-loader", "css-loader"]
// 			}
// 		]
// 	},
// 	resolve: { extensions: ["*", ".js", ".jsx"] },
// 	output: {
// 		path: path.resolve(__dirname, "dist/"),
// 		publicPath: "/dist/",
// 		filename: "bundle.js"
// 	},
// 	devServer: {
// 		static: {
// 			directory: path.join(__dirname, "public/")
// 		},
// 		port: 3000,
// 		devMiddleware: {
// 			publicPath: "https://localhost:3000/dist/",
// 		},
// 		hot: "only",
// 	}
// };

const path = require('path');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
	mode: isDevelopment ? 'development' : 'production',
	devServer: {
		client: { overlay: false },
	},
	entry: {
		main: './src/index.js',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: path.join(__dirname, 'src'),
				use: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			}
		],
	},
	plugins: [
		isDevelopment && new ReactRefreshPlugin(),
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: './public/index.html',
		}),
	].filter(Boolean),
	resolve: {
		extensions: ['.js', '.jsx'],
	},
};