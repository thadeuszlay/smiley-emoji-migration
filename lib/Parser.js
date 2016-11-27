function Picker() {
}
Picker.prototype.match_regex = /\B([:;]{1}[+\-\(\)\[\]\w_äöü]*)$/;

Picker.prototype.emoji_template = '<img alt="{alt}" class="emojione" src="{img}"/>';

Picker.prototype.parse_template = function(img, alt) {
	return this.emoji_template
		.replace('{img}', img)
		.replace('{alt}', alt);
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
