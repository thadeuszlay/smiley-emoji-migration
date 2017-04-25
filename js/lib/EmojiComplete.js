import $ from 'jquery';
require('imports-loader?jQuery=jquery!jquery-textcomplete');
import emojione from 'emojione';
import Parser from './Parser.js';
import Smileystore from './Smileystore.js';

(function EmojiComplete() {
	'use strict';

	emojione.emojioneList = $.extend(emojione.emojioneList, Smileystore.smileylist);

	$.fn.emojicomplete = function (options) {
		var default_options = {
			maxCount: 10
		};

		// Shortcuts?
		default_options.onKeydown = function (e, commands) {
			if (!e.ctrlKey && e.which == 13) {
				return commands.KEY_ENTER;
			}
		};

		var settings = $.extend(default_options, options);

		var textcomplete_schema = {
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

		return $.fn.textcomplete(textcomplete_schema, settings);
	};

}());
