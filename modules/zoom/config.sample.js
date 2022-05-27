const env = 'production'

const config = {
	production:{	
		APIKey : 'XXXXXXXX',
		APISecret : 'XXXXXXXXXXXX'
	}
};

module.exports = config[env]
