require.config(RequireConfig);
require(
	[
		'js/edit/view/EditView'
	],
	function(
		EditView
	) {
		$(document).ready(function() {
			var view = new EditView({ el: $('body') });
		});
	}
);
