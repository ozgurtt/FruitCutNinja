/*global $:false */

$(function() {
	'use strict';

	var toggled = false;
	var $menu = $('#slide-menu');
	var $stars = $('.star');

	$('.toggle-menu').on('click tap touchstart', function() {

		$menu.animate({
			top: toggled ? '-32%' : 0
		});

		toggled = !toggled;

		return false;
	});

	$stars.on('click tap touchstart', function() {
		var $self = $(this);
		var index = $self.index();

		$stars.removeClass('selected');
		$stars.each(function() {
			var $elem = $(this);

			if ($elem.index() <= index) {
				$elem.addClass('selected');
			}
		});

		// send score to the backend
		$.ajax({
			url: 'save-score',
			type: 'POST',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify({
				score: index + 1
			})
		});

		return false;
	});

	$('.more-games').on('click', function(e) {
		var $self = $(this);
		e.preventDefault();

		$.ajax({
		url: 'save-stats',
			type: 'POST',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify({
				'link-clicked': 1
			}),
			complete: function() {
				window.location = $self.attr('href');
			}
		});
	});
});