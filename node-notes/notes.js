const fs = require('fs');



const addNote = (title, body) => {
	let notes = [];
	const note = {
		title,
		body,
	}

	try {
		const notesString = fs.readFileSync('notes-data.json');
		notes = JSON.parse(notesString);
	} catch(err) {

	}

	let duplicateNotes = notes.filter((note) => note.title === title);


	if (duplicateNotes.length === 0) {
		notes.push(note);
		fs.writeFileSync('notes-data.json', JSON.stringify(notes));
	} else {
		console.log(`A note titled ${title} already exists!`);
	}
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