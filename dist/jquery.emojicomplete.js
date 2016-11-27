(function (jQuery) {
function Picker() {
}
Picker.prototype.match_regex = /\B([:;]{1}[+\-\(\)\[\]\w_äöü]*)$/;

Picker.prototype.emoji_template = '<img alt="{alt}" class="emojione" src="{img}"/>';

Picker.prototype.parse_template = function(img, alt) {
	return this.emoji_template
		.replace('{img}', img)
		.replace('{alt}', alt);
};

Picker.prototype.shortnameToImage = function(str, template) {
	return str.replace(/:?;?\+?\-?[\w\)\(_]+:?/g, function(shortname) {
		var orig_shortname = shortname;
		var unicode_obj = emojione.emojioneList[shortname];
		if (unicode_obj) {
			if (unicode_obj.isSmiley)
			{
				return template
					.replace('{img}', '/vendor/smilies/'+unicode_obj.filename)
					.replace('{alt}', orig_shortname);
			} else {
				unicode = unicode_obj.unicode;
				return getTemplate(template, unicode[unicode.length-1], shortname);
			}
		}
		return unicode_obj;
	});
};

Picker.prototype.shortnameToUnicode = function(emojione, str) {
	return str.replace(/:?\+?[\w_\-]+:?/g, function(shortname) {
		var unicode_obj = emojione.emojioneList[shortname];
		if (unicode_obj) {
			unicode = unicode_obj.unicode;
			if (unicode_obj.isSmiley === true) {
				return unicode[unicode.length-1];
			}
			return emojione.convert(unicode[unicode.length-1]);
		}
		return unicode_obj;
	});
};

module.exports = Picker;

if (typeof jQuery === 'undefined') {
	throw new Error('jQuery.textcomplete requires jQuery');
}

+function ($, emojione, Parser, Smileystore) {
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

}(jQuery, emojione, Parser, Smileystore);
return jQuery;
});