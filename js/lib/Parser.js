function Parser() {
}
Parser.prototype.match_regex = /\B([:;]{1}[+\-\(\)\[\]\w_äöü]*)$/;

Parser.prototype.emoji_template = '<img alt="{alt}" class="emojione" src="{img}"/>';

Parser.prototype.parse_template = function(img, alt) {
	return this.emoji_template
		.replace('{img}', img)
		.replace('{alt}', alt);
};

Parser.prototype.shortnameToImage = function(str, template) {
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

Parser.prototype.shortnameToUnicode = function(emojione, str) {
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

module.exports = Parser;
var Parser = new Parser();
