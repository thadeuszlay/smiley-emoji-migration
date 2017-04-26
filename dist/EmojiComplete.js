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


(function EmojiComplete() {
	'use strict';

	_emojione2.default.emojioneList = _jquery2.default.extend(_emojione2.default.emojioneList, _Smileystore2.default.smileylist);

	_jquery2.default.fn.emojicomplete = function (options) {
		var default_options = {
			maxCount: 10
		};

		// Shortcuts?
		default_options.onKeydown = function (e, commands) {
			if (!e.ctrlKey && e.which == 13) {
				return commands.KEY_ENTER;
			}
		};

		var settings = _jquery2.default.extend(default_options, options);

		var textcomplete_schema = {
			match: _Parser2.default.match_regex,
			search: function search(term, callback) {
				console.log('suche nach ' + term);
				callback(_jquery2.default.map(map, function (emoji) {
					return emoji.indexOf(term) === 0 ? emoji : null;
				}));
			},
			template: function template(value) {
				return _Parser2.default.shortnameToImage(value, _Parser2.default.emoji_template) + " " + value;
			},
			replace: function replace(value) {
				return _Parser2.default.shortnameToUnicode(value);
			},
			cache: true,
			index: 1
		};

		return _jquery2.default.fn.textcomplete(textcomplete_schema, settings);
	};
})();