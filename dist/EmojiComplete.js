'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = EmojiComplete;

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
function EmojiComplete(elements, options) {
	'use strict';

	var store = new _Smileystore2.default();

	// Zu Emojis noch Smilies ergänzen
	_emojione2.default.emojioneList = _jquery2.default.extend(_emojione2.default.emojioneList, store.smileylist);

	var map = _jquery2.default.map(_emojione2.default.emojioneList, function (_, emoji) {
		return (/_tone[12345]/.test(emoji) ? null : emoji
		);
	});

	map.sort();

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

	var settings = _jquery2.default.extend(default_options, options);

	var textcomplete_settings = {
		maxCount: settings.maxCount,
		placement: settings.placement,
		onKeydown: settings.onKeydown
	};

	var parser = new _Parser2.default(_emojione2.default);
	parser.emoji_template = settings.emojiTemplate;
	parser.smiley_template = settings.smileyTemplate;
	parser.emojiPath = settings.emojiImagePath;
	parser.smileyPath = settings.smileyImagePath;

	var textcomplete_schema = {
		match: parser.match_regex,
		search: function search(term, callback) {
			callback(_jquery2.default.map(map, function (emoji) {
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

	elements.textcomplete([textcomplete_schema], textcomplete_settings);
};