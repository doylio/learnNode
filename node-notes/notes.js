const fs = require('fs');


const fetchNotes = () => {
	try {
		const notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);
	} catch(err) {
		return [];
	}
};

const saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

const logNote = (note) => {
		console.log("");
		console.log(`Title: ${note.title}`);
		console.log(`Body: ${note.body}`);
};

const addNote = (title, body) => {
	let notes = fetchNotes();
	const note = {
		title,
		body,
	}
	let duplicateNotes = notes.filter((note) => note.title === title);

	if (duplicateNotes.length === 0) {
		notes.push(note);
		saveNotes(notes);
		return note;
	}
};

const getNote = (title) => {
	return (fetchNotes().filter((note) => note.title === title)[0]);
};

const getAll = () => {
	return fetchNotes();
};

const removeNote = (title) => {
	const notes = fetchNotes();
	const filteredNotes = notes.filter((note) => note.title !== title);
	saveNotes(filteredNotes);
	return notes.length !== filteredNotes.length;
};

module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote,
	logNote,
};