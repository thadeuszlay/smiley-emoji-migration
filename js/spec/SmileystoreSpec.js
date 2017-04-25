var assert = require('assert');
var expect = require('chai').expect;
import Smileystore from '../lib/Smileystore.js';

describe("Smileystore", function() {
	var smileystore = new Smileystore;;

	it("should have a smileylist attribute", function() {
		expect(typeof(smileystore.smileylist)).to.equal('object');
	});

});
