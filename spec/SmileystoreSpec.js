describe("Smileystore", function() {
	var Smileystore = require('../lib/Smileystore');
	var smileystore;

	beforeEach(function() {
		smileystore = new Smileystore();
	});

	it("should have a smileylist attribute", function() {
		expect(typeof(smileystore.smileylist)).toEqual('object');
	});

});
