const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/ToDoApp', {useNewUrlParser: true}, (err, client) => {
	if(err) {
		return console.log("Unable to connect to MongoDB server", err)
	}
	console.log("Connected to MongoDB server")
	const db = client.db('ToDoApp')

	// db.collection('Todos').insertOne({
	// 	'text': 'Something to do',
	// 	'completed': true
	// }, (err, result) => {
	// 	if(err) {
	// 		return console.log('Unable to insert todo', err)
	// 	}
	// 	console.log(JSON.stringify(result.ops, undefined, 2))
	// })

	// db.collection('Users').insertOne({
	// 	name: 'Danerys Targaryen',
	// 	age: 18,
	// 	location: "Westeros"
	// }, (err, result) => {
	// 	if(err) {
	// 		return console.log("Unable to insert to Users", err)
	// 	}
	// 	console.log(result.ops[0]._id.getTimestamp())
	// })

	client.close()
})
