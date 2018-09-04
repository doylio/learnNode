const mongoose = require('mongoose')

mongoose.Promise = global.Promise //configures mongoose to use built in promise API
mongoose.connect('mongodb://localhost:27017/ToDoApp')

const Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	}
})

const User = mongoose.model('User', {
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	}
})

const firstUser = new User({email: 'draco_malfoy@hogwarts.edu  '})
save(firstUser)

// let newTodo = new Todo({
// 	text: 'Cook Dinner',
// })

// newTodo.save().then(console.log, (err) => {
// 	console.log("Unable to save", err)
// })

// let secondTodo = new Todo({text: "    Fix the app   "})

// save(secondTodo)

async function save(obj) {
	try {
		let res = await obj.save()
		console.log(res)
	} catch(err) {
		console.log(err)
	}
}