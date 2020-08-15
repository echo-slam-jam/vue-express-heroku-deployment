const path = require('path');

module.exports = {
	//manipulates asset transfer deployment directory
	outputDir: path.resolve(__dirname, '../server/public'),
	devServer: {
		//puts proxy for localhost
		proxy: {
			'/api': {
				target: 'http://localhost:5000'
			}
		}
	}
};