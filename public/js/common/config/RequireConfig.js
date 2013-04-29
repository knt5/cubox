/**
 * RequireJS の設定
 */
var RequireConfig = {
	// ベースパス
	baseUrl: '',
	
	// ライブラリパス
	paths: {
		'underscore':      'lib/underscore-1.4.4.min'
		, 'backbone':      'lib/backbone-1.0.0.min'
		, 'mustache':      'lib/mustache-0.7.2'
		, 'text':          'lib/require-text-2.0.5'
		, 'easing':        'lib/jquery-easing-1.3'
		, 'MegaPixImage':  'lib/megapix-image'
	},
	
	// export名定義、依存関係定義
	shim: {
		'underscore':   { exports: '_' },
		'backbone':     { exports: 'Backbone', deps: ['underscore'] },
		'mustache':     { exports: 'Mustache' }
	}
};
