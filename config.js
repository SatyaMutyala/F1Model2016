var path = require('path');

exports.config = {
	// See docs at https://github.com/brunch/brunch/blob/master/docs/config.md
	modules: {
		definition: false,
		wrapper: false
	},

	paths: {
		"public": 'public',
		"watched": ['app','css']
	},

	files: {
		javascripts: {
			joinTo: {
				'js/app.js': /^app/,
				'js/vendor.js': [
					/^bower_components/
				]
			}
		},
		stylesheets: {
			joinTo: {
				'css/app.css': /^app/,
				'css/bootstrap.css': /^bower_components(\\|\/)(bootstrap)(\\|\/)/
			}
		}
	},

	plugins: {
		autoReload: {
			enabled: 'on'
		},
		uglify: {
			mangle: true,
			compress: {
				pure_funcs: ['console.log', 'alert']
			}
		},
		cleancss: {
			keepSpecialComments: 0,
			removeEmpty: true
		}
	},

	server: {
		port: 3333
	},

	conventions: {
		//assets: /app(\\|\/)assets(\\|\/)/
	},

	sourceMaps: true
};
