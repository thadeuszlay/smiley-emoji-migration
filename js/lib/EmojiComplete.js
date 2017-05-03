import $ from 'jquery';
require('imports-loader?jQuery=jquery!jquery-textcomplete');
import emojione from 'emojione';
import Parser from './Parser.js';
import Smileystore from './Smileystore.js';

export default function EmojiComplete(elements, options) {
	'use strict';

	var store = new Smileystore;

	// Zu Emojis noch Smilies ergänzen
	emojione.emojioneList = $.extend(emojione.emojioneList, store.smileylist);

	var map = $.map(emojione.emojioneList, function (_, emoji) {
		return /_tone[12345]/.test(emoji) ? null : emoji;
	});

	map.sort();

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

	var parser = new Parser(emojione);
	parser.emoji_template = settings.emojiTemplate;
	parser.smiley_template = settings.smileyTemplate;
	parser.emojiPath = settings.emojiImagePath;
	parser.smileyPath = settings.smileyImagePath;

	var textcomplete_schema = {
		match: parser.match_regex,
		search: function (term, callback) {
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

	elements.textcomplete([textcomplete_schema], textcomplete_settings);
};
