if (typeof jQuery === 'undefined') {
	throw new Error('jQuery.emojicomplete requires jQuery');
}

(function emojicomplete($, emojione, Parser, Smileystore) {
	'use strict';

	emojione.emojioneList = $.extend(emojione.emojioneList, Smileystore.smileylist);

	$.fn.emojicomplete = function (option) {
		var default_options = {
			maxCount: 10
		};

		// Shortcuts?
		default_options.onKeydown = function (e, commands) {
			if (!e.ctrlKey && e.which == 13) {
				return commands.KEY_ENTER;
			}
		};

		var options = $.extend(default_options, option);

		var textcomplete_shema = {
			match: Parser.match_regex,
			search: function (term, callback) {
				console.log('suche nach '+term);
				callback($.map(map, function (emoji) {
					return emoji.indexOf(term) === 0 ? emoji : null;
				}));
			},
			template: function (value) {
				return Parser.shortnameToImage(value, Parser.emoji_template) + " " + value;
			},
			replace: function (value) {
				return Parser.shortnameToUnicode(value);
			},
			cache: true,
			index: 1
		};

		return $.fn.textcomplete(textcomplete_shema, options);
	};

}(jQuery, emojione, Parser, Smileystore));
