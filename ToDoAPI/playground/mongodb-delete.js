const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/ToDoApp', {useNewUrlParser: true}, (err, client) => {
	if(err) {
		return console.log("Unable to connect to MongoDB server", err)
	}
	console.log("Connected to MongoDB server")
	const db = client.db('ToDoApp')

	//deleteMany
	// db.collection('Todos').deleteMany({text: 'Eat lunch'}).then(console.log)

	//deleteOne
	// db.collection('Todos').deleteOne({text: "Eat lunch"}).then(console.log)

	//findOneAndDelete
	// db.collection('Todos').findOneAndDelete({completed: false}).then((doc) => {
	// 	console.log(JSON.stringify(doc, undefined, 2))
	// })


	db.collection('Users').deleteMany({name: "Danerys Targaryen"}).then(console.log)
	db.collection('Users').findOneAndDelete({_id: new ObjectID("5b8e51f6c6771d240c62de4f")}).then((doc) => {
		console.log(doc)
		console.log("I let her go...")
	})


	// client.close()
})
