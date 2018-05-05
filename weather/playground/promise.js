const asyncAdd = (a, b) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (typeof a === 'number' && typeof b === 'number') {
				resolve(a + b);
			} else {
				reject('Arguments must be numbers');
			}
		}, 1500);
	});
}

asyncAdd(81, 50)
.then((res) => {
	console.log(res);
	return asyncAdd(res, 10);
})
.then(console.log)
.catch(console.log);
