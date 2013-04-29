define(
	[
		'underscore'
	],
	function(
		_
	) {
		// コンストラクタ
		var Plate = function(obj) {
			this.obj = obj;  // CSS3DObject
		};
		
		// 定義
		_.extend(Plate.prototype, {
			x: 0,
			y: 0,
			z: 0,
			rotateX: 0,
			rotateY: 0,
			rotateZ: 0,
			obj: null,
			set: function(x, y, z, rotateX, rotateY, rotateZ) {
				this.x = x || 0;
				this.y = y || 0;
				this.z = z || 0;
				this.rotateX = rotateX || 0;
				this.rotateY = rotateY || 0;
				this.rotateZ = rotateZ || 0;
				
				// パラメータをセット
				this.obj.position.set(this.x, this.y, this.z);
				this.obj.rotation.set(this.rotateX, this.rotateY, this.rotateZ);
			}
		});
		
		return Plate;
	}
);
