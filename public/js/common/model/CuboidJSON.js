define(
	[
		'underscore'
	],
	function(
		_
	) {
		// コンストラクタ
		var CuboidJSON = function() {
			this.texture = new Array(6);
		};

		// 定義
		_.extend(CuboidJSON.prototype, {
			// サイズ
			width: 0,
			height: 0,
			depth: 0,
			
			// サムネイル (base64/jpeg)
			thumb: null,
			
			// テクスチャ (base64/jpeg) (表, 右, 下, 裏, 左, 上)
			texture: null,  //[ {}, {}, {}, {}, {}, {} ]

			// 投稿情報
			id: '',        // 投稿された直方体を一意に識別するID (アップロード時のみ)
			user: '',      // 投稿ユーザ名 (アップロード時のみ、Twitter アカウント)
			date: '',      // 投稿日時 (ローカルストレージ＋アップロード)
			
			// 閲覧回数
			count: 0   // 投稿後に閲覧された回数 (アップロード後に有効)
			
		});

		return CuboidJSON;
	}
);
