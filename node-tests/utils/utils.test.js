const utils = require('./utils');
const expect = require('expect');


it('should add two numbers', () => {
	let res = utils.add(33, 11);
	expect(res).toBe(44).toBeA('number');
});

it('should square a number', () => {
	let res = utils.square(5);
	expect(res).toBe(25).toBeA('number');
});

it('should verify first and last names are set', () => {
	let user = {
		username: "obishawnkenobi",
		age: 22,
		location: "Chongqing"
	};

	let res = utils.setName(user, "Shawn Doyle");
	expect(res).toBeA('object').toInclude({
		firstName: "Shawn",
		lastName: "Doyle"
	});
	expect(user).toEqual(res);
})


// it('should expect some values', () => {
// 	// expect(12).toNotBe(14);
// 	// expect({name: "Shawn"}).toNotEqual({name: "Colin"});
// 	// expect([1,2,3]).toExclude(5);
// 	expect({
// 		name: "Shawn",
// 		age: 22,
// 		location: "Chongqing"
// 	}).toExclude({age: 24});
// });

