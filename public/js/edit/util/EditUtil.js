define(
	[
		'MegaPixImage'
		, 'js/edit/model/EditModel'
		, 'js/edit/util/GraphicsUtil'
		, 'js/common/model/Point'
		, 'js/common/model/Cuboid3d'
	],
	function(
		MegaPixImage
		, editModel       // オブジェクト
		, graphicsUtil    // オブジェクト
		, Point           // クラス
		, Cuboid3d        // クラス
	) {
		var EditUtil = {
			//=================================================================
			// 3D直方体データの生成
			//=================================================================
			generateCuboid3d: function() {
				var cuboid, p, $img, $hiddenCanvas, hiddenContext, w, h, times;
				var src, dst, context, $canvas, dstWidth, dstHeight; //, p0, p1, p2, p3;
				var orient, points, x, y;
				var id, idxList;
				//var width, height, idx;  // 縮小処理を試みた時の残骸。削除してOK

				// デフォルト値の設定された Cuboid3d 生成
				editModel.cuboid3d = new Cuboid3d();

				for(id=1; id<=2; id++) {
					// キャンバス取得
					$canvas = $('#canvas' + id);

					// キャンバスが存在する場合のみ実行
					if($canvas.length) {
						context = $canvas.get(0).getContext('2d');

						//-------------------------------------
						// 変換元画像の準備
						// ウィンドウサイズの変更に伴う画像サイズの変動などに対応するため、ここで実施
						$img = $('#image' + id);
						$hiddenCanvas = $('#hiddenCanvas' + id);
						hiddenContext = $hiddenCanvas.get(0).getContext('2d');

						// 回転位置取得
						orient = editModel.exif[id - 1]['Orientation'];

						// 画像のサイズ取得
						if(orient >= 5 && orient <= 8) {  // 逆転
							h = $img.get(0).width;
							w = $img.get(0).height;
						} else {  // そのまま
							w = $img.get(0).width;
							h = $img.get(0).height;
						}
						
						// コピー倍率設定 (横幅が指定サイズになるように調整)
						times = editModel.textureWidth / w;

						// 見た目のサイズ設定
						$hiddenCanvas.width(w);
						$hiddenCanvas.height(h);

						// 解像度設定
						$hiddenCanvas.get(0).width = w * times;
						$hiddenCanvas.get(0).height = h * times;

						// 描画
						editModel.megaPixImage[id - 1].render($hiddenCanvas.get(0), {
							width: w * times,
							height: h * times
							// MegaPixImage の orientation は崩れるので使用しない
							//orientation: editModel.exif[id - 1]['Orientation']
						});

						// src 設定
						src = hiddenContext.getImageData(0, 0, w * times, h * times);

						//-------------------------------------
						// 頂点取得 (3枚)
						cuboid = editModel.cuboids[id-1];
						points = cuboid.points;
						for(var i=0; i<3; i++) {
							// (1) 面に対応する頂点を設定。固定値なのでここに書くべきではない。単純な二次元配列にしてeditModelに持てばいい話。
							// (2) サイズ設定
							idxList = new Array(4);
							if(id == 1) {  // 表
								switch(i) {
									case 0:  // 表
										idxList[0] = 0;
										idxList[1] = 3;
										idxList[2] = 2;
										idxList[3] = 1;
										break;
									case 1:  // 右
										idxList[0] = 3;
										idxList[1] = 6;
										idxList[2] = 5;
										idxList[3] = 2;
										break;
									case 2:  // 下
										idxList[0] = 1;
										idxList[1] = 2;
										idxList[2] = 5;
										idxList[3] = 4;
										break;
								}
								dstWidth   = editModel.cuboid3d.getWidth(i);
								dstHeight  = editModel.cuboid3d.getHeight(i);
							} else {  // 裏
								switch(i) {
									case 0:  // 裏
										idxList[0] = 3;
										idxList[1] = 2;
										idxList[2] = 1;
										idxList[3] = 0;
										break;
									case 1:  // 左
										idxList[0] = 2;
										idxList[1] = 5;
										idxList[2] = 4;
										idxList[3] = 1;
										break;
									case 2:  // 上
										idxList[0] = 6;
										idxList[1] = 5;
										idxList[2] = 2;
										idxList[3] = 3;
										break;
								}
								dstWidth   = editModel.cuboid3d.getWidth(i+3);
								dstHeight  = editModel.cuboid3d.getHeight(i+3);
							}
							
							// 抽出する頂点情報を生成
							p = new Array(4);
							for(var j=0; j<4; j++) {
								p[j] = new Point(points[idxList[j]].x * times, points[idxList[j]].y * times);
							}

							// 座標を回転
							if(orient == 6) {  // 左に90度回転
								for(var j=0; j<p.length; j++) {
									x = p[j].y;
									y = h * times - p[j].x;
									p[j].x = x;
									p[j].y = y;
								}
							} else if(orient == 3) {  // 左に180度回転
								for(var j=0; j<p.length; j++) {
									x = w * times - p[j].x;
									y = h * times - p[j].y;
									p[j].x = x;
									p[j].y = y;
								}
							} else if(orient == 8) {  // 左に270度回転
								for(var j=0; j<p.length; j++) {
									x = w * times - p[j].y;
									y = p[j].x;
									p[j].x = x;
									p[j].y = y;
								}
							}

							// 透視変換
							dst = graphicsUtil.transform(src, dstWidth, dstHeight, p[0], p[1], p[2], p[3], context);
							
							// 縮小 (残骸。iOSで重いのでやらないことに決定 2013/4/25)
							/*
							width  = dstWidth  * editModel.resizeTimes;
							height = dstHeight * editModel.resizeTimes;
							dst = graphicsUtil.transform(src, width, height, p[0], p[1], p[2], p[3], context);
							idx = (id-1)*3 + i;
							var resizer = new Resize(width, height, dstWidth, dstHeight, true, true, false, function (buffer) {
								// 変換後の画像を保存
								var imageData = context.createImageData(dstWidth, dstHeight);
								//for (var j = 0; j < buffer.length; j++) {
								//	imageData.data[j] = buffer[j] & 0xFF;
								//}
								imageData.data = buffer;
								editModel.cuboid3d.texture[idx] = imageData;
							});
							resizer.resize(dst.data);
							//*/
							
							// 変換後の画像を保存
							editModel.cuboid3d.texture[(id-1)*3+i] = dst;
						}
					}
				}
			}
		};
		return EditUtil;
	}
);
