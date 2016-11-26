function Picker() {
}
Picker.prototype.match_regex = /\B([:;]{1}[+\-\(\)\[\]\w_äöü]*)$/;

module.exports = Picker;
