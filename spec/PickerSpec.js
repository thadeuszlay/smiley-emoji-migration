describe("Picker", function() {
	var Picker = require('../lib/Picker');
	var picker;

	beforeEach(function() {
		picker = new Picker();
	});

	var find_data = [
		':',
		';',
		':-',
		':-)',
		':dolfin',
		':blush',
	];

	find_data.forEach(function(part) {
		it("should find the term \""+part+"\"", function() {
			expect(picker.match_regex.test(part)).toEqual(true);
		});
	});

	var unfind_data = [
		'a',
		',.-',
		':blush:',
	];

	unfind_data.forEach(function(part) {
		it("should not find the term \""+part+"\"", function() {
			expect(picker.match_regex.test(part)).toEqual(false);
		});
	});

});
