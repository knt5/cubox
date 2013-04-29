define(
	[
		'backbone'
		, 'mustache'
		, 'text!js/common/template/nav.html'
		, 'text!js/help/template/body.html'
	],
	function(
		Backbone
		, Mustache
		, nav
		, body
	) {
		var HelpView = Backbone.View.extend({
			//=============================================
			// イベント
			events: {
				
			},
			
			//=============================================
			// 初期化処理
			initialize: function() {
				// HTML 生成
				this.$el.html(Mustache.render(body, { nav: nav }));
				
				// メニューアクティブ化
				$('#navHelp').attr('class', 'active');
			}
			
		});
		return HelpView;
	}
);
