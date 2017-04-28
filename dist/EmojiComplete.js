'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _emojione = require('emojione');

var _emojione2 = _interopRequireDefault(_emojione);

var _Parser = require('./Parser.js');

var _Parser2 = _interopRequireDefault(_Parser);

var _Smileystore = require('./Smileystore.js');

var _Smileystore2 = _interopRequireDefault(_Smileystore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('imports-loader?jQuery=jquery!jquery-textcomplete');


(function EmojiComplete($) {
	'use strict';

	_emojione2.default.emojioneList = $.extend(_emojione2.default.emojioneList, _Smileystore2.default.smileylist);

	$.fn.emojicomplete = function (options) {
		var default_options = {
			maxCount: 10,
			emojiTemplate: '<img alt="{alt}" class="emojione" src="{img}"/>',
			smileyTemplate: '<img alt="{alt}" class="emojione" src="{img}"/>',
			emojiImagePath: '/dist/emojione/',
			smileyImagePath: '/dist/smilies/',
			placement: null,
			// Shortcuts?
			onKeydown: function onKeydown(e, commands) {
				if (!e.ctrlKey && e.which == 13) {
					return commands.KEY_ENTER;
				}
			}
		};

		var settings = $.extend(default_options, options);

		var textcomplete_settings = {
			maxCount: settings.maxCount,
			placement: settings.placement,
			onKeydown: settings.onKeydown
		};

		var parser = new _Parser2.default();
		parser.emoji_template = settings.emojiTemplate;
		parser.smiley_template = settings.smileyTemplate;
		parser.emojiPath = settings.emojiImagePath;
		parser.smileyPath = settings.smileyImagePath;

		var textcomplete_schema = {
			match: parser.match_regex,
			search: function search(term, callback) {
				console.log('suche nach ' + term);
				callback($.map(map, function (emoji) {
					return emoji.indexOf(term) === 0 ? emoji : null;
				}));
			},
			template: function template(value) {
				return parser.shortnameToImage(value, parser.emoji_template) + " " + value;
			},
			replace: function replace(value) {
				return parser.shortnameToUnicode(value);
			},
			cache: true,
			index: 1
		};

		return $.fn.textcomplete([textcomplete_schema], textcomplete_settings);
	};
})(_jquery2.default);