module.exports = {
	plugins: {
		"postcss-import": {},
		"postcss-mixins": {},
		"@csstools/postcss-global-data": {
			files: [
				"src/app/css/typography.css", 
				"src/app/css/mixins.css", 
				"src/app/css/breakpoints.module.css"
			],
		},
		"postcss-extend-rule": {},
		"postcss-pxtorem": {
			propList: ["*"],
			selectorBlackList: ["html"],
		},
		"postcss-nesting": {
			edition: '2021',
			noIsPseudoSelector: true
		},
	},
};
