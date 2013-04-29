define(
	[
		'underscore'
	],
	function(
		_
	) {
		// コンストラクタ
		var Cuboid3d = function() {
			// デフォルト値
			this.width  = 400;
			this.height = 600;
			this.depth  = 100;
			
			// 初期化
			this.texture = new Array(6);
		};

		// 定義
		_.extend(Cuboid3d.prototype, {
			// サイズ
			width: 0,
			height: 0,
			depth: 0,

			// テクスチャ (ImageData) (表, 右, 下, 裏, 左, 上)
			texture: [ {}, {}, {}, {}, {}, {} ],
			
			// プレート (Canvas要素) (表, 右, 下, 裏, 左, 上)
			plate: [ {}, {}, {}, {}, {}, {} ],
			
			// コントロール
			prevX: 0,
			prevY: 0,
			moving: false,
			
			// 指定されたテクスチャの幅を返す
			getWidth: function(idx) {
				switch(idx) {
					case 0:  // 表
						return this.width;
					case 1:  // 右
						return this.depth;
					case 2:  // 下
						return this.width;
					case 3:  // 裏
						return this.width;
					case 4:  // 左
						return this.depth;
					case 5:  // 上
						return this.width;
				}
				return 0;
			},
			
			// 指定されたテクスチャの高さを返す
			getHeight: function(idx) {
				switch(idx) {
					case 0:  // 表
						return this.height;
						break;
					case 1:  // 右
						return this.height;
						break;
					case 2:  // 下
						return this.depth;
						break;
					case 3:  // 裏
						return this.height;
						break;
					case 4:  // 左
						return this.height;
						break;
					case 5:  // 上
						return this.depth;
						break;
				}
				return 0;
			}

		});

		return Cuboid3d;
	}
);
