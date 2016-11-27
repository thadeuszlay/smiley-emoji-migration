if (typeof jQuery === 'undefined') {
	throw new Error('jQuery.textcomplete requires jQuery');
}

+function ($, emojione, Parser) {
	'use strict';

	$.fn.emojicomplete = function (option) {
		var defaults = {
			maxCount: 10
		};
		var options = $.extend(defaults, option);

		var textcomplete_shema = {
			match: Parser.match_regex,
			search: function (term, callback) {
				console.log('suche nach '+term);
				callback($.map(map, function (emoji) {
					return emoji.indexOf(term) === 0 ? emoji : null;
				}));
			},
			template: function (value) {
				return shortnameTo(value, self.emojiTemplate) + " " + value;
			},
			replace: function (value) {
				return shortnameToUnicode(value);
			},
			cache: true,
			index: 1
		};

		return $.fn.textcomplete(textcomplete_shema, options);
	};

}(jQuery, emojione, Parser);
