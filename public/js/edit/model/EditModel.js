define(
	[
	],
	function(
	) {
		// edit サブシステム内で共有されるデータを保持
		var EditModel = {
			// 定数
			touchRange: 60,
			inlineNum: 3,
			textureWidth: 960, // テクスチャの横解像度(横幅) ★性能に直結するので調整には細心の注意を
			//resizeTimes: 1,    // (textureWidth * resizeTimes) のサイズに透視変換し、textureWidth のサイズに縮小する。
			itemId: 'cubox',
			jpegQuality: 0.8,
			thumbWidth: 100,
			thumbHeight: 100,
			thumbTimes: 2,    // 表示サイズの何倍のサイズのサムネイルを作るか
			
			// 現在の稼働モード
			mode: 'edit',  // edit モード、view モード
			
			// ローカルストレージへの保存 id
			localCuboidId: -1,
			
			// 直方体(2D)
			cuboids: [ {}, {} ],
			
			// 画像の Exif 情報
			exif: [ {}, {} ],
			
			// alert で表示する Exif 情報
			prettyExif: [ "", "" ],
			
			// 原寸サイズ画像データ
			megaPixImage: [ {}, {} ],
			
			// 直方体 (3D)
			cuboid3d: null,
			//geometry: null,
			//mesh: null,
			scene: null,
			camera: null,
			radius: 800,  // カメラの原点からの距離
			radian1: Math.PI / 4,
			radian2: Math.PI / 4,
			renderer: null,
			
			// 拡大縮小コントロール
			firstRadius: 0,  // ジェスチャー開始時の半径
			scaling: false,
			
			// 自動回転
			autoRotation: true,
			
			// メソッド登録
			render: null,
			moveCamera: null

		};
		return EditModel;
	}
);
