define(
	[
		'js/edit/model/EditModel'
		, 'js/common/model/Cuboid3d'
	],
	function(
		editModel         // オブジェクト
		, Cuboid3d        // クラス
	) {
		// 閲覧専用モードの時に使うユーティリティ
		var ViewModeUtil = {
			//=================================================================
			// ページセットアップ (見えなくすべきものを見えなくして、見せるべきものを見えるようにする)
			//=================================================================
			setup: function() {
				$('.editModeElement').css('display', 'none');
				$('.viewModeElement').css('display', '');
			},

			//=================================================================
			// 3Dプレビューをセットアップ
			//=================================================================
			setupPreview3d: function(cuboid, editView) {
				//-----------------------------------------
				// 閲覧モードで稼働することを決定
				if(cuboid) {  // データが取れた時のみ
					//editModel.mode = 'view';  // モード指定
					//viewModeUtil.setup();     // ページセットアップ

					//---------------------------------
					// メタデータを表示
					$('#viewModeCuboidInfo').html('');
					$('#viewModeCuboidInfo').text("作成日時 : " + cuboid.date);
					
					//---------------------------------
					// JSONデータをすべて表示
					$('#jsonPreview').val(JSON.stringify(cuboid));

					//---------------------------------
					// cuboid3d データを生成
					//var context = $('#texture0').get(0).getContent('2d');
					editModel.cuboid3d = new Cuboid3d();
					var c = editModel.cuboid3d;
					c.width  = cuboid.width;
					c.height = cuboid.height;
					c.depth  = cuboid.depth;
					var img; //, canvas, context;
					//var loadCount = 0;
					// base64 の画像データを ImageData 形式に変換する
					for(var i=0; i<6; i++) {
						// 隠し画像の src にデータをセット
						img = $('#textureImage' + i).get(0);
						img.src = cuboid.texture[i];
					}

					// 力技で一旦切り抜け。500 ミリ秒待つ。
					setTimeout(function(c, This) {
						clearTimeout();
						//---------------------------------
						for(var i=0; i<6; i++) {
							var img = $('#textureImage' + i).get(0);
							var canvas = $('#texture' + i).get(0);
							canvas.width = c.getWidth(i);
							canvas.height = c.getHeight(i);
							var context = canvas.getContext('2d');
							context.drawImage(img, 0, 0, c.getWidth(i), c.getHeight(i));
							//console.log(cuboid);
							//console.log(img);
							//console.log(canvas);
							c.texture[i] = context.getImageData(0, 0, c.getWidth(i), c.getHeight(i));
						}
						//---------------------------------
						// preview3d にデータを注入
						This.clickCreate3d();
					}, 500, c, editView);
				}
			}
			
		};
		return ViewModeUtil;
	}
);
