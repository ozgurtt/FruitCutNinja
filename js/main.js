/*global $:false, console: false */

$(function() {
	'use strict';

	var toggled = false;
	var $menu = $('#slide-menu');
	$('#toggle-menu').on('click tap', function() {
		
		if (!toggled) {
			toggled = true;
			$menu.animate({
				top: 0
			});
		} else {
			toggled = false;
			$menu.animate({
				top: '-90%'
			});
		}
	});
});