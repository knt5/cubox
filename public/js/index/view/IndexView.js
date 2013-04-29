define(
	[
		'backbone'
		, 'mustache'
		, 'js/index/util/LocalUtil'
		, 'text!js/common/template/nav.html'
		, 'text!js/index/template/body.html'
	],
	function(
		Backbone
		, Mustache
		, localUtil  // オブジェクト
		, nav
		, body
	) {
		var IndexView = Backbone.View.extend({
			//=============================================
			// イベント
			events: {
				
			},
			
			//=============================================
			// 初期化処理
			initialize: function() {
				// HTML 生成
				this.$el.html(Mustache.render(body, { nav: nav }));
				
				// ローカルストレージに保存された作品
				var $localCuboids = $('#localCuboids');
				var localCubox = localUtil.getCuboxData();
				if(localCubox) {
					for(var i=localCubox.cuboids.length - 1; i>=0; i--) {
						$localCuboids.append('<a href="edit.html#local:' + i + '"><img class="thumb" src="' + localCubox.cuboids[i].thumb + '"></a> ');
					}
				}
				
				// サーバに保存されているみんなの作品
				
			}
			
		});
		return IndexView;
	}
);
