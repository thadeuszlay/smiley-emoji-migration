describe("Parser", function() {
	var Parser = require('../lib/Parser');
	var parser;

	beforeEach(function() {
		parser = new Parser();
	});

	describe("match_regex", function() {
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
				expect(parser.match_regex.test(part)).toEqual(true);
			});
		});

		var unfind_data = [
			'a',
			',.-',
			':blush:',
		];

		unfind_data.forEach(function(part) {
			it("should not find the term \""+part+"\"", function() {
				expect(parser.match_regex.test(part)).toEqual(false);
			});
		});
	});

	describe("parse_template", function() {
		var data = [
			{
				alt: ':-)',
				img: 'smiley.gif',
				expected: '<img alt=":-)" class="emojione" src="smiley.gif"/>',
			},
		];

		data.forEach(function(part) {
			it("should parse the template \""+part.template+"\"", function() {
				expect(parser.parse_template(part.img, part.alt))
					.toEqual(part.expected);
			});
		});
	});

});
