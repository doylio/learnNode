const fs = require('fs');

const originalNote = {
	title: 'Sample Title',
	body: "Lorem ipsum el taco machine.",
};

const originalNoteString = JSON.stringify(originalNote);

fs.writeFileSync('notes.json', originalNoteString, (err) => {
	if(err) {
		console.log(err);
	}
});

const noteString = fs.readFileSync('notes.json');

const note = JSON.parse(noteString);

console.log(typeof note);
console.log(note.title);