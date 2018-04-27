console.log("Starting app");

setTimeout(() => {
	console.log("Callback function!");
}, 2000);

setTimeout(() => {
	console.log("No time")
}, 0);

console.log("Finishing up")