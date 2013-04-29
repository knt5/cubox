define(
	[
	],
	function(
	) {
		var GraphicsUtil = {
			// 透視変換 (C)akm2
			transform: function(src, dstWidth, dstHeight, p0, p1, p2, p3, context) {
				var sx, sy, dx1, dy1, dx2, dy2,
					z, g, h,
					m0, m1, m2, m3, m4, m5, m6, m7,
					srcWidth, srcHeight, srcPixels,
					dst, dstPixels,
					x, y, yi, u, v, t, dx, dy, i, j;

				sx = p0.x - p1.x + p2.x - p3.x;
				sy = p0.y - p1.y + p2.y - p3.y;
				dx1 = p1.x - p2.x;
				dy1 = p1.y - p2.y;
				dx2 = p3.x - p2.x;
				dy2 = p3.y - p2.y;

				z = dx1 * dy2 - dy1 * dx2;
				g = (sx * dy2 - sy * dx2) / z;
				h = (sy * dx1 - sx * dy1) / z;

				m0 = p1.x - p0.x + g * p1.x;
				m1 = p3.x - p0.x + h * p3.x;
				m2 = p0.x;
				m3 = p1.y - p0.y + g * p1.y;
				m4 = p3.y - p0.y + h * p3.y;
				m5 = p0.y;
				m6 = g;
				m7 = h;

				srcWidth  = src.width;
				srcHeight = src.height;
				srcPixels = src.data;

				dst = context.createImageData(dstWidth, dstHeight);
				dstPixels = dst.data;

				for (y = 0; y < dstHeight; y++) {
					yi = y * dstWidth;
					for (x = 0; x < dstWidth; x++) {
						i = (yi + x) << 2;
						u = x / dstWidth;
						v = y / dstHeight;
						t = m6 * u + m7 * v + 1;
						dx = (m0 * u + m1 * v + m2) / t;
						dy = (m3 * u + m4 * v + m5) / t;
						if (dx >= 0 && dx < srcWidth && dy >= 0 && dy < srcHeight) {
							j = ((dy | 0) * srcWidth + (dx | 0)) << 2;
							dstPixels[i]     = srcPixels[j];
							dstPixels[i + 1] = srcPixels[j + 1];
							dstPixels[i + 2] = srcPixels[j + 2];
						}
						dstPixels[i + 3] = 255;
					}
				}

				return dst;

			}

		};
		return GraphicsUtil;
	}
);
