const webpack = require('webpack');

module.exports = {
	webpack: {
		plugins: {
			add: [
				new webpack.ProvidePlugin({
					process: 'process/browser.js',
				})
			]
		},
		configure: {
			resolve: {
				fallback: {
					'stream': require.resolve('stream-browserify'),
					'util': require.resolve('util/'),
					'crypto': require.resolve('crypto-browserify'),
					'buffer': require.resolve('buffer/'),
				}
			},
		},
	},
};