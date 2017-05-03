var assert = require('assert');
var expect = require('chai').expect;
import Parser from '../lib/Parser.js';

describe("Parser", function() {
	var emojione = {
		emojioneList: {
			":fischer:":{"isCanonical":false,"isSmiley":false,"unicode":["1f3a3"],"filename":""},
			":heck:":{"isCanonical":false,"isSmiley":true,"unicode":[":heck:"],"filename":"heck.gif"},
		},
		convert: function(str) {
			return 'unicode:'+str;
		},
	};

	var parser = new Parser(emojione);

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
			it("should parse the template", function() {
				expect(parser.parse_template(parser.emoji_template, part.img, part.alt))
					.to.equal(part.expected);
			});
		});
	});

	describe("shortnameToUnicode", function() {
		it("should parse :fischer: to unicode:1f3a3", function() {
			expect(parser.shortnameToUnicode(':fischer:'))
				.to.equal('unicode:1f3a3');
		});

		it("should parse :heck: to :heck:", function() {
			expect(parser.shortnameToUnicode(':heck:'))
				.to.equal(':heck:');
		});
	});

});
