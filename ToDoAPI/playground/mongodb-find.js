const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/ToDoApp', {useNewUrlParser: true}, (err, client) => {
	if(err) {
		return console.log("Unable to connect to MongoDB server", err)
	}
	console.log("Connected to MongoDB server")
	const db = client.db('ToDoApp')

	db.collection('Todos').find().count().then((count) => {
		console.log('Todos count:')
		console.log(count)
	}, (err) => {
		console.log("Unable to fetch todos", err)
	})

	db.collection('Users').find({name: "Danerys Targaryen"}).toArray().then(docs => {
		console.log(JSON.stringify(docs, undefined, 2))
	}, err => {
		console.log(err)
	})
	// client.close()
})
