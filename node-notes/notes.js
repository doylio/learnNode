const fs = require('fs');


console.log("Starting notes.js");

const addNote = (title, body) => {
	let notes = [];
	const note = {
		title,
		body,
	}

	const notesString = fs.readFileSync('notes-data.json');
	notes = JSON.parse(notesString);

	notes.push(note);
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

const getNote = (title) => {
	console.log("Reading note ", title);
};

const getAll = () => {
	console.log("Getting all notes");
};

const removeNote = (title) => {
	console.log("Removing note ", title);
};

module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote,
};