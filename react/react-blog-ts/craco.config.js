const CracoLessPlugin = require('craco-less');

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: { '@primary-color': 'red' },
						javascriptEnabled: true,
						globalVars: {
							hack: `true; @import '${__dirname}/src/assets/style/variable.less';`
						}
					},
				},
			},
		},
	],
};