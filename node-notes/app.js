const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');


const titleOptions = {
	describe: 'Title of note',
	demand: true,
	alias: 't',
}

const argv = yargs
	.command('add', 'Add a new note', {
		title: titleOptions,
		body: {
			describe: 'Body of note',
			demand: true,
			alias: 'b',
		}
	})
	.command('list', 'List all notes')
	.command("read", "Read a note", {
		title: titleOptions
	})
	.command('remove', 'Remove a note', {
		title: titleOptions
	})
	.help()
	.argv;

const command = process.argv[2];

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
	const allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} note(s).`);
	allNotes.forEach((note) => notes.logNote(note));
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