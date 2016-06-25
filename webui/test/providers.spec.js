describe ('prueba de Provider', function() {
	beforeEach(module('flickrApp.provider'));

	var test;

	beforeEach(inject(function($provider) {
		test = $provider('Flickr');
	}))

	it ("igual a todo esto", function(){
		var tel = 'asdfadsf';
		expect(test).toBe('dddddddd');
	})
});
