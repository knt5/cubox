define(
	[
		'underscore'
	],
	function(
		_
	) {
		// コンストラクタ
		var Point = function(x, y) {
			this.x = x || 0;
			this.y = y || 0;
		};
		
		// 定義
		_.extend(Point.prototype, {
			x: 0,
			y: 0,
			prevX: 0,
			prevY: 0,
			moving: false,
			movingId: -1
		});
		
		return Point;
	}
);
