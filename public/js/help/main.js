require.config(RequireConfig);
require(
	[
		'js/help/view/HelpView'
	],
	function(
		HelpView
	) {
		$(document).ready(function() {
			var view = new HelpView({ el: $('body') });
		});
	}
);
