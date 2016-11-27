function Picker() {
}
Picker.prototype.match_regex = /\B([:;]{1}[+\-\(\)\[\]\w_äöü]*)$/;

Picker.prototype.emoji_template = '<img alt="{alt}" class="emojione" src="{img}"/>';

Picker.prototype.parse_template = function(img, alt) {
	return this.emoji_template
		.replace('{img}', img)
		.replace('{alt}', alt);
};

module.exports = Picker;
