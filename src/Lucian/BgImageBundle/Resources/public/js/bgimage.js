(function($) {
	"use strict";

	var runApp = function() {
		steal('jquery/model', 'jquery/view', 'jquery/controller', function() {
//			jQuery.Model('BgImage', {
//				update: 'POST /bgimage',
//				get: 'GET /bgimage'
//			}, {});

			jQuery("#app-content").html('/bundles/lucianbgimage/js/bgimage.ejs', { message: 'hello world' });
		});
	};

	// Process login and start app once we've logged in
	$(function() {
		$('#login-form').submit(function(e) {
			e.preventDefault();

			var $this = $(e.currentTarget),
				inputs = {};

			// Send all form's inputs
			$.each($this.find('input'), function(i, item) {
				var $item = $(item);
				inputs[$item.attr('name')] = $item.val();
			});

			// Send form into ajax
			$.ajax({
				url: $this.attr('action'),
				type: 'POST',
				dataType: 'json',
				data: inputs,
				success: function(data) {
				   if (data.has_error) {
				       alert('Error: ' + data.error);
				   }
				   else {
				       runApp($);
				   }
				}
			});

			return false;
		});
	});
}(jQuery));