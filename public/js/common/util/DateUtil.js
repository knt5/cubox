define(
	[
	],
	function(
	) {
		var DateUtil = {
			//=================================================================
			// 現在の日時を取得
			//=================================================================
			getNowDateTime: function() {
				var weeks = new Array('日','月','火','水','木','金','土');
				var now = new Date();

				// 個別属性取得
				var year = now.getYear(); // 年
				var month = now.getMonth() + 1; // 月
				var day = now.getDate(); // 日
				var week = weeks[ now.getDay() ]; // 曜日
				var hour = now.getHours(); // 時
				var min = now.getMinutes(); // 分
				var sec = now.getSeconds(); // 秒
				
				// 年補正
				if(year < 2000) { year += 1900; }
				
				// 0 付与
				if(month < 10) { month = "0" + month; }
				if(day < 10) { day = "0" + day; }
				if(hour < 10) { hour = "0" + hour; }
				if(min < 10) { min = "0" + min; }
				if(sec < 10) { sec = "0" + sec; }
				
				return '' + year + '/' + month + '/' + day + '(' + week + ') ' + hour + ':' + min + ':' + sec;
			}
		};
		return DateUtil;
	}
);
