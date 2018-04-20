const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');


const argv = yargs.argv;
const command = process.argv[2];
// console.log('Command: ', command);
// console.log('Yargs: ', argv);

console.log("");
if (command === 'add') {
	const note = notes.addNote(argv.title, argv.body);
	if(note) {
		console.log("Note added to notes \n");
		notes.logNote(note);
	} else {
		console.log("A note with that title already exists!");
	}
} 
else if (command === 'list') {
	notes.getAll();
} 
else if (command === 'read') {
	const returnedNote = notes.getNote(argv.title);
	if (returnedNote) {
		notes.logNote(returnedNote);
	} else {
		console.log(`Unable to find ${argv.title}`);
	}
}
else if (command === 'remove'){
	const removedNote = notes.removeNote(argv.title);
	console.log( removedNote ? `${argv.title} removed from notes` : 'Note not found');
}
else {
	console.log('Command not recognized');
}