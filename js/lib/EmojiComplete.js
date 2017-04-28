import jQuery from 'jquery';
require('imports-loader?jQuery=jquery!jquery-textcomplete');
import emojione from 'emojione';
import Parser from './Parser.js';
import Smileystore from './Smileystore.js';

(function EmojiComplete($) {
	'use strict';

	emojione.emojioneList = $.extend(emojione.emojioneList, Smileystore.smileylist);

	$.fn.emojicomplete = function (options) {
		var default_options = {
			maxCount: 10,
			emojiTemplate: '<img alt="{alt}" class="emojione" src="{img}"/>',
			smileyTemplate:'<img alt="{alt}" class="emojione" src="{img}"/>',
			emojiImagePath: '/dist/emojione/',
			smileyImagePath: '/dist/smilies/',
			placement: null,
			// Shortcuts?
			onKeydown: function (e, commands) {
				if (!e.ctrlKey && e.which == 13) {
					return commands.KEY_ENTER;
				}
			},
		};

		var settings = $.extend(default_options, options);

		var textcomplete_settings = {
			maxCount: settings.maxCount,
			placement: settings.placement,
			onKeydown: settings.onKeydown,
		};

		var parser = new Parser();
		parser.emoji_template = settings.emojiTemplate;
		parser.smiley_template = settings.smileyTemplate;
		parser.emojiPath = settings.emojiImagePath;
		parser.smileyPath = settings.smileyImagePath;

		var textcomplete_schema = {
			match: parser.match_regex,
			search: function (term, callback) {
				console.log('suche nach '+term);
				callback($.map(map, function (emoji) {
					return emoji.indexOf(term) === 0 ? emoji : null;
				}));
			},
			template: function (value) {
				return parser.shortnameToImage(value, parser.emoji_template) + " " + value;
			},
			replace: function (value) {
				return parser.shortnameToUnicode(value);
			},
			cache: true,
			index: 1
		};

		return $.fn.textcomplete(textcomplete_schema, textcomplete_settings);
	};
}(jQuery));
