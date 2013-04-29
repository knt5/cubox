define(
	[
		'underscore'
		, 'js/common/model/Point'
	],
	function(
		_
		, Point
	) {
		// コンストラクタ
		var Cuboid = function() {
		};
		
		// 定義
		_.extend(Cuboid.prototype, {
			// ライン描画用の頂点組み合わせデータ [線の集合] (固定)
			lines: [
				[1, 0]    // 0
				, [4, 1]  // 1
				, [5, 4]  // 2
				, [5, 6]  // 3
				, [6, 3]  // 4
				, [3, 0]  // 5
				, [2, 1]  // 6
				, [2, 3]  // 7
				, [5, 2]  // 8
			],

			// 内部ライン描画用の辺の組み合わせデータ [面の集合] (固定) lines に依存
			planes: [
				[0, 7]
				, [5, 6]
				, [1, 8]
				, [6, 2]
				, [8, 4]
				, [7, 3]
			],

			// カラー (固定)
			color: '#ff8800',
			
			// 座標データ
			points: null,
			
			// 座標の初期化処理
			init: function(id) {
				// 初期位置算出
				var $canvas = $('#canvas' + id)
				var w = $canvas.width();
				var h = $canvas.height();
				var len = 0;
				var margin = 20;
				if(w > h) {  // 横長
					len = parseInt((h - (margin * 2)) / 2);
				} else {  // 縦長
					len = parseInt((w - (margin * 2)) / 2);
				}
				var x = parseInt(w / 2) - len;
				var y = parseInt(h / 2) - len;
				
				// point リスト生成
				if(this.points === null) {
					this.points = new Array(7);
				}
				
				// 初期位置設定
				for(var i=0; i<7; i++) {
					this.points[i] = new Point();
					this.points[i].x = x;
					this.points[i].y = y;
					this.points[i].moving = false;
					this.points[i].movingId = -1;
				}
				this.points[0].x += len;
				this.points[0].y += 0;
				this.points[1].x += 0;
				this.points[1].y += parseInt(len / 2);
				this.points[2].x += len;
				this.points[2].y += len;
				this.points[3].x += len * 2;
				this.points[3].y += parseInt(len / 2);
				this.points[4].x += 0;
				this.points[4].y += parseInt(len * 1.5);
				this.points[5].x += len;
				this.points[5].y += len * 2;
				this.points[6].x += len * 2;
				this.points[6].y += parseInt(len * 1.5);
			}
		});
		
		return Cuboid;
	}
);
