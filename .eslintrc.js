module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'@typescript-eslint'
	],
	'rules': {
		'indent': [
			'error',
			'tab',
			{
				'SwitchCase': 1
			},
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'react/prop-types': 0,
		'react/no-unescaped-entities': 0,
		'react/jsx-indent-props': [ 0, 'tab' ],
		'no-unused-vars': [
			2,
			{
				'vars': 'all',
				'args': 'none',
				'ignoreRestSiblings': true
			}
		],
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/explicit-module-boundary-types': 0,
	},
}
