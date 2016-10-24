module.exports = {

	// tileserver port
	port : 3003,


	redis : {

		layers : {
			port : 6379,
			host : 'redislayers',
			auth : 'MUST_MATCH_REDIS_CONFIG',
			db : 2
		},

		stats : {
			port : 6379,
			host : 'redisstats',
			auth : 'MUST_MATCH_REDIS_CONFIG',
			db : 2
		},

		temp : {
			port : 6379,
 			host : 'redistemp',
   			auth : 'MUST_MATCH_REDIS_CONFIG',
   			db : 2
		}

	},

	// mongo
	mongo : {
		url : 'mongodb://mongo/systemapic'
	},

	path : {
		log : '/data/logs/'
	},

	// no access
	noAccessMessage : 'No access. Please contact Mapic.io if you believe you are getting this message in error.',
	noAccessTile    : 'public/noAccessTile.png',
	
	// waiting tile
	processingTile : 'public/noAccessTile.png',

	// stylesheets
	defaultStylesheets : {
		raster : 'public/cartoid.xml',
		utfgrid : 'public/utfgrid.xml'
	},

}