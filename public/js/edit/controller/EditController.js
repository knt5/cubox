define(
	[
		'js/edit/model/EditModel'
	],
	function(
		editModel  // オブジェクト
	) {
		var EditController = {
			//=============================================
			// キャンバスを追加
			addCanvas: function(id) {
				$('#preview' + id).append('<canvas id="canvas' + id + '" class="canvas"></canvas>');
			},
			
			//=============================================
			// キャンバスのリサイズ
			resizeCanvas: function(id) {
				var $canvas = $('#canvas' + id);
				var $image = $('#image' + id);
				if($image.length && $image.width() > 2 && $image.height() > 2) {
					// キャンバス存在確認
					if($canvas.length) {  // 存在する
						// do nothing
					} else {
						this.addCanvas(id);
						$canvas = $('#canvas' + id);
					}
					
					// キャンバス設定
					if($canvas.length) {  // 存在チェック
						// 位置
						$canvas.css('top', $image.offset().top + 'px');
						$canvas.css('left', $image.offset().left + 'px');
						
						// 見た目のサイズ設定
						$canvas.width($image.width() - 2);    // border 1px
						$canvas.height($image.height() - 2);  // border 1px
						
						// 解像度設定
						$canvas.get(0).width = $canvas.width();
						$canvas.get(0).height = $canvas.height();
						
						// 直方体をドロー
						this.drawCuboid(id);
					}
				}
			},

			//=============================================
			// キャンバスに直方体を描画
			redraw: function(id) {
				var $canvas = $('#canvas' + id);
				$canvas.get(0).width = $canvas.get(0).width;  // クリア
				this.drawCuboid(id);
			},
			
			//=============================================
			// キャンバスに直方体を描画
			drawCuboid: function(id) {  // private
				var $canvas = $('#canvas' + id);
				var x1, y1, x2 ,y2;
				var begin, end;
				var cuboid = editModel.cuboids[id-1];
				if($canvas.length) {  // 存在チェック
					var context = $canvas.get(0).getContext('2d');
					if(context && cuboid.points && cuboid.points.length >= 7) {

						// 外枠ライン
						context.beginPath();
						context.strokeStyle = cuboid.color;
						context.lineWidth = 5;
						for(var i=0; i<cuboid.lines.length; i++) {
							begin = cuboid.lines[i][0];
							end = cuboid.lines[i][1];
							x1 = cuboid.points[begin].x;
							y1 = cuboid.points[begin].y;
							x2 = cuboid.points[end].x;
							y2 = cuboid.points[end].y;
							context.moveTo(x1, y1);
							context.lineTo(x2, y2);
						}
						context.stroke();

						// 内部ライン
						var line1, line2, dx1, dy1, dx2, dy2, x3, y3, x4, y4;
						context.beginPath();
						context.strokeStyle = cuboid.color;
						context.lineWidth = 1;
						for(var i=0; i<cuboid.planes.length; i++) {
							line1 = cuboid.lines[cuboid.planes[i][0]];
							line2 = cuboid.lines[cuboid.planes[i][1]];

							// line1
							x1 = cuboid.points[line1[0]].x;
							y1 = cuboid.points[line1[0]].y;
							x2 = cuboid.points[line1[1]].x;
							y2 = cuboid.points[line1[1]].y;
							dx1 = ((x2 - x1) / (editModel.inlineNum + 1));
							dy1 = ((y2 - y1) / (editModel.inlineNum + 1));

							// line2
							x3 = cuboid.points[line2[0]].x;
							y3 = cuboid.points[line2[0]].y;
							x4 = cuboid.points[line2[1]].x;
							y4 = cuboid.points[line2[1]].y;
							dx2 = ((x4 - x3) / (editModel.inlineNum + 1));
							dy2 = ((y4 - y3) / (editModel.inlineNum + 1));

							// 描画
							for(var j=0; j<editModel.inlineNum; j++) {
								context.moveTo(x1 + (dx1 * (j+1)), y1 + (dy1 * (j+1)));
								context.lineTo(x3 + (dx2 * (j+1)), y3 + (dy2 * (j+1)));
							}

						}
						context.stroke();

					}
				}
			},

			//=============================================
			// 画像情報文字列を作成
			createPrettyExif: function(id) {
				var exif = editModel.exif[id - 1];
				var s = "";
				if(exif) {
					for(var info in exif) {
						s += info + ": " + exif[info] + "\n";
					}
				}
				return s;
			}

		};
		return EditController;
	}
);
