var assert = require('assert');
var expect = require('chai').expect;
import Parser from '../lib/Parser.js';

describe("Parser", function() {
	var parser = new Parser;
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
				expect(parser.match_regex.test(part)).to.equal(true);
			});
		});

		var unfind_data = [
			'a',
			',.-',
			':blush:',
		];

		unfind_data.forEach(function(part) {
			it("should not find the term \""+part+"\"", function() {
				expect(parser.match_regex.test(part)).to.equal(false);
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
					.to.equal(part.expected);
			});
		});
	});

	describe("shortnameToUnicode", function() {
		var emojione = {};
		emojione.emojioneList = {
			":fischer:":{"isCanonical":false,"isSmiley":false,"unicode":["1f3a3"],"filename":""},
			":heck:":{"isCanonical":false,"isSmiley":true,"unicode":[":heck:"],"filename":"heck.gif"},
		};
		emojione.convert = function(str) {
			return 'unicode:'+str;
		};

		it("should parse :fischer: to unicode:1f3a3", function() {
			expect(parser.shortnameToUnicode(emojione, ':fischer:'))
				.to.equal('unicode:1f3a3');
		});

		it("should parse :heck: to :heck:", function() {
			expect(parser.shortnameToUnicode(emojione, ':heck:'))
				.to.equal(':heck:');
		});
	});

});
