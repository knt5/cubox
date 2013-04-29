define(
	[
		'js/edit/model/EditModel'
		, 'js/common/model/Point'
		, 'js/common/model/Plate'
	],
	function(
		editModel      // オブジェクト
		, Point        // クラス
		, Plate        // クラス
	) {
		var ThreeUtil = {
			//=================================================================
			// 自動レンダリング
			render: function() {
				// 定期レンダリング登録
				requestAnimationFrame( editModel.render );  // 以降、 render は global から呼ばれることに注意
				
				// カメラをわずかに動かし続ける。横に回転
				if(editModel.autoRotation) {
					editModel.moveCamera(0.1, 0);
					
					// レンダリング
					editModel.renderer.render(editModel.scene, editModel.camera);
				}
			},
			
			//=================================================================
			// カメラ位置変更 (EditView がコール)
			moveCamera: function(dx, dy) {
				var p = editModel.camera.position;
				var r1, r2;
				var rad;
				
				// ラジアンの差分
				rad = Math.PI * 2 * 10;
				
				// ラジアン算出
				r1 = editModel.radian1 - (dx / rad);
				r2 = editModel.radian2 + (dy / rad);
				
				// ラジアン適用
				editModel.radian1 = r1;
				if(r2 >= - Math.PI / 2 && r2 <= Math.PI / 2) {
					editModel.radian2 = r2;
				}
				
				//　位置設定
				p.x = editModel.radius * Math.sin( editModel.radian1 );
				p.z = editModel.radius * Math.cos( editModel.radian1 );
				p.y = editModel.radius * Math.sin( editModel.radian2 );
				 
				/*
				p.x = editModel.radius * Math.sin( editModel.radian1 );
				p.z = editModel.radius * Math.cos( editModel.radian1 );
				p.y = editModel.radius * Math.sin( editModel.radian2 );
				*/
				/*
				p.x = editModel.radius * ( Math.sin( editModel.radian1 ) - Math.cos( editModel.radian2 ) );
				p.z = editModel.radius * ( Math.cos( editModel.radian1 ) - Math.cos( editModel.radian2 ) );
				p.y = editModel.radius * Math.sin( editModel.radian2 );
				*/
				
				// 注視点設定
				editModel.camera.lookAt({x:0, y:0, z:0});
				
				// レンダリング
				if(!editModel.autoRotation) {  // 自動回転が無効の時はレンダリング
					editModel.renderer.render(editModel.scene, editModel.camera);
				}
			},
			
			//=================================================================
			// 3D モデルのサイズを変更
			setWidth: function(w) {
				// 影響を受ける面の番号
				var ilist = [0, 2, 3, 5];  // 裏表上下
				var $t;
				
				// 3D モデルのパラメータに設定
				editModel.cuboid3d.width = w;
				
				// 見た目のサイズを変更 (解像度は変更しない)
				for(var i=0; i<ilist.length; i++) {
					$t = $('#texture' + ilist[i]);
					$t.width(w);
				}
			},
			setHeight: function(h) {
				// 影響を受ける面の番号
				var ilist = [0, 1, 3, 4];  // 裏表左右
				var $t;
				
				// 3D モデルのパラメータに設定
				editModel.cuboid3d.height = h;
				
				// 見た目のサイズを変更 (解像度は変更しない)
				for(var i=0; i<ilist.length; i++) {
					$t = $('#texture' + ilist[i]);
					$t.height(h);
				}
			},
			setDepth: function(d) {
				// 影響を受ける面の番号
				var ilist1 = [1, 4];  // 左右
				var ilist2 = [2, 5];  // 上下
				var $t;
				
				// 3D モデルのパラメータに設定
				editModel.cuboid3d.depth = d;
				
				// 見た目のサイズを変更 (解像度は変更しない)
				for(var i=0; i<ilist1.length; i++) {
					$t = $('#texture' + ilist1[i]);
					$t.width(d);
				}
				for(var i=0; i<ilist2.length; i++) {
					$t = $('#texture' + ilist2[i]);
					$t.height(d);
				}
			},
			
			//=================================================================
			// 3D モデルのプレートの位置情報をリセット
			resetCuboid3dPlatePosition: function() {
				var c = editModel.cuboid3d;
				var x, y, z, rx, ry, rz;
				
				// CSS3Dオブジェクトのパラメータを設定 (原点を中心にして配置)
				for(var i=0; i<6; i++) {
					switch(i) {
						case 0:  // 表
							x = 0;
							y = c.depth / 2;
							z = 0;
							rx = - Math.PI / 2;
							ry = 0;
							rz = 0;
							break;
						case 1:  // 右
							x = c.width / 2;
							y = 0;
							z = 0;
							rx = - Math.PI / 2;
							ry = Math.PI / 2;
							rz = 0;
							break;
						case 2:  // 下
							x = 0;
							y = 0;
							z = c.height / 2;
							rx = 0;
							ry = 0;
							rz = 0;
							break;
						case 3:  // 裏
							x = 0;
							y = - c.depth / 2;
							z = 0;
							rx = - Math.PI / 2;
							ry = Math.PI;
							rz = 0;
							break;
						case 4:  // 左
							x = - c.width / 2;
							y = 0;
							z = 0;
							rx = - Math.PI / 2;
							ry = - Math.PI / 2;
							rz = 0;
							break;
						case 5:  // 上
							x = 0;
							y = 0;
							z = - c.height / 2;
							rx = 0;
							ry = Math.PI;
							rz = 0;
							break;
					}
					c.plate[i].set(x, y, z, rx, ry, rz);
				}
			},
			
			//=================================================================
			// 3D モデルをリセット
			resetPreview3d: function() {
				var i;
				var c = editModel.cuboid3d;
				
				// データがあるときのみ実施
				if(c) {
					// サイズ設定
					var $preview3d = $('#preview3d');
					var width = $preview3d.width();
					var height = $preview3d.width();  // 正方形
					
					// シーンを生成
					editModel.scene = new THREE.Scene();
					
					// テクスチャ生成
					var w, h;
					var $textureCanvas, textureCanvas, textureContext;
					//var x, y, z, rx, ry, rz;
					for(i=0; i<6; i++) {
						// テクスチャ書き出し用キャンバス
						$textureCanvas = $('#texture' + i);
						textureCanvas = $textureCanvas.get(0);
						
						// サイズ
						w = c.getWidth(i);
						h = c.getHeight(i);
						
						// 見た目のサイズ設定
						$textureCanvas.width(w);
						$textureCanvas.height(h);
						
						// 解像度設定
						textureCanvas.width  = w;
						textureCanvas.height = h;
						
						// 画像をドロー
						textureContext = textureCanvas.getContext('2d');
						textureContext.putImageData(c.texture[i], 0, 0);
						
						// CSS3Dオブジェクトを生成 (CSS3DRenderer用)
						//c.plate[i] = new Plate(x, y, z, rx, ry, rz, new THREE.CSS3DObject(textureCanvas));
						c.plate[i] = new Plate(new THREE.CSS3DObject(textureCanvas));
						
						// シーンにCSS3Dオブジェクトを追加
						editModel.scene.add(c.plate[i].obj);
						
					}
					
					// 全プレートの位置を設定
					this.resetCuboid3dPlatePosition();
					
					// プレートの可視化
					for(i=0; i<6; i++) {
						$('#texture' + i).css('display', '');
					}
					
					// カメラ
					editModel.camera = new THREE.PerspectiveCamera(40, width / height, 1, 1000);
					//editModel.camera.position.set(500, 500, 500);
					//editModel.camera.lookAt(c.plate[0]);
					editModel.camera.lookAt({x:0, y:0, z:0});
					
					// レンダラ
					editModel.renderer = new THREE.CSS3DRenderer();
					editModel.renderer.setSize(width, height);
					
					// DOM追加
					$preview3d.append(editModel.renderer.domElement);
					
					// メソッド登録
					editModel.render = this.render;
					editModel.moveCamera = this.moveCamera;
					
					// カメラ初期位置設定
					this.moveCamera(0, 0);
					
					// レンダリング開始
					this.render();
					
				}
				
			}
		};
		return ThreeUtil;
	}
);
