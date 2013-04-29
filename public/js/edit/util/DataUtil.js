define(
	[
		'js/edit/model/EditModel'
		, 'js/common/util/DateUtil'
		, 'js/common/model/Point'
		, 'js/common/model/CuboidJSON'
	],
	function(
		editModel         // オブジェクト
		, dateUtil        // オブジェクト
		, Point           // クラス
		, CuboidJSON      // クラス
	) {
		var DataUtil = {
			//=================================================================
			// 保存する形式の JSON データ作成
			//=================================================================
			createCuboidJSON: function() {
				var canvas;
				var $canvas;
				var context;
				var srcCanvas;
				var w, h;
				var orient;

				//-------------------------------------
				// データ保存オブジェクトを生成
				var data = new CuboidJSON();

				//-------------------------------------
				// 幅、高さ、奥行きを保存
				data.width  = editModel.cuboid3d.width;
				data.height = editModel.cuboid3d.height;
				data.depth  = editModel.cuboid3d.depth;

				//-------------------------------------
				// 現在日時を保存
				data.date = dateUtil.getNowDateTime();
				
				//-------------------------------------
				// テクスチャデータをBase64のPNGにエンコード＋保存
				for(var i=0; i<6; i++) {
					canvas = $('#texture' + i).get(0);
					data.texture[i] = canvas.toDataURL('image/jpeg', editModel.jpegQuality);
				}
				
				//-------------------------------------
				// サムネイルを作成
				
				// サイズ
				var width = editModel.thumbWidth * editModel.thumbTimes;
				var height = editModel.thumbHeight * editModel.thumbTimes;
				
				// サムネイル作成先を作成
				$canvas = $('#thumb');
				canvas = $canvas.get(0);
				$canvas.width(width);
				$canvas.height(height);
				canvas.width = width;
				canvas.height = height;
				context = canvas.getContext('2d');

				// 回転計算
				orient = editModel.exif[0]['Orientation'];
				if(orient) {  // 回転する必要があるときは回転する。6と8だけサポート。
					if(orient === 6) {
						context.translate(width, 0);
						context.rotate(Math.PI / 2);
					} else if(orient === 8) {
						context.translate(0, height);
						context.rotate(- Math.PI / 2);
					}
				}

				// サムネイル作成元canvasのコンテキストを取得
				srcCanvas = $('#hiddenCanvas1').get(0);
				w = srcCanvas.width;
				h = srcCanvas.height;

				// サムネイル作成
				if(w < h) {  // w に合わせる
					context.drawImage(srcCanvas, 0, parseInt((h-w)/2), w, w, 0, 0, width, height);
				} else {     // h に合わせる
					context.drawImage(srcCanvas, parseInt((w-h)/2), 0, h, h, 0, 0, width, height);
				}
				
				// サムネイル保存
				data.thumb = canvas.toDataURL('image/jpeg', editModel.jpegQuality);

				//-------------------------------------
				// 作成したオブジェクトを返す
				return data;
			}
		};
		return DataUtil;
	}
);
