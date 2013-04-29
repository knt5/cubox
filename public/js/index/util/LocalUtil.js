define(
	[
		'js/edit/model/EditModel'
	],
	function(
		editModel         // オブジェクト (定数参照専用)
	) {
		var LocalUtil = {
			//=================================================================
			// ローカルストレージからデータを取得
			//=================================================================
			getCuboxData: function() {
				var rawData = localStorage.getItem(editModel.itemId);
				var cubox = null;
				if(rawData) {
					cubox = JSON.parse(rawData);
				}
				return cubox;
			}
		};
		return LocalUtil;
	}
);
