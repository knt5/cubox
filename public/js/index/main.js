require.config(RequireConfig);
require(
	[
		'js/index/view/IndexView'
	],
	function(
		IndexView
	) {
		$(document).ready(function() {
			var view = new IndexView({ el: $('body') });
		});
	}
);
