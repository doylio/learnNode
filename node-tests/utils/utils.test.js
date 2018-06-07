const utils = require('./utils');
const expect = require('expect');


describe('Utils', () => {
	describe('Addition', () => {
		it('should add two numbers', () => {
			let res = utils.add(33, 11);
			expect(res).toBe(44).toBeA('number');
		});

		it('should asyncAdd two numbers', (done) => {
			utils.asyncAdd(4, 3, (sum) => {
				expect(sum).toBeA('number').toBe(7);
				done();
			})
		});
	});

	describe('Exponents', () => {
		it('should square a number', () => {
			let res = utils.square(5);
			expect(res).toBe(25).toBeA('number');
		});

		it('should square a number after 1 second', (done) => {
			utils.asyncSquare(5, (square) => {
				expect(square).toBeA('number').toBe(25);
				done();
			})
		});
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
})
