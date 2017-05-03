var Parser = function(emojione)
{
	this.match_regex = /\B([:;]{1}[+\-\(\)\[\]\w_äöü]*)$/;

	this.emoji_template = '<img alt="{alt}" class="emojione" src="{img}"/>';
	this.smiley_template = '<img alt="{alt}" class="emojione" src="{img}"/>';

	this.emojiPath = '';
	this.smileyPath = '';

	this.parse_template = function(template, img, alt) {
		return template
			.replace('{img}', img)
			.replace('{alt}', alt);
	};

	this.shortnameToImage = function(str, template) {
		var self = this;
		return str.replace(/:?;?\+?\-?[\w\)\(_]+:?/g, function(shortname) {
			var orig_shortname = shortname;
			var unicode_obj = emojione.emojioneList[shortname];
			if (unicode_obj) {
				if (unicode_obj.isSmiley)
				{
					return self.parse_template(self.smiley_template, self.smileyPath+unicode_obj.filename, orig_shortname);
				} else {
					var unicode = unicode_obj.unicode;
					return self.parse_template(self.emoji_template, self.emojiPath+unicode[unicode.length-1]+'.png', shortname);
				}
			}
			return unicode_obj;
		});
	};

	this.shortnameToUnicode = function(str) {
		return str.replace(/:?;?\+?[\w\)\(_\-]+:?/g, function(shortname) {
			var unicode_obj = emojione.emojioneList[shortname];
			if (unicode_obj) {
				var unicode = unicode_obj.unicode;
				if (unicode_obj.isSmiley === true) {
					return unicode[unicode.length-1];
				}
				return emojione.convert(unicode[unicode.length-1]);
			}
			return unicode_obj;
		});
	};
};

export default Parser;
