const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/ToDoApp', {useNewUrlParser: true}, (err, client) => {
	if(err) {
		return console.log("Unable to connect to MongoDB server", err)
	}
	console.log("Connected to MongoDB server")
	const db = client.db('ToDoApp')

	// db.collection('Todos').findOneAndUpdate(
	// 	{_id: new ObjectID('5b8e66d076cab1fab95fcc5c')}, 
	// 	{$set: {completed: true} }, 
	// 	{returnOriginal: false}
	// ).then(console.log)


	db.collection('Users').findOneAndUpdate(
		{_id: new ObjectID('5b8e51183db4ac4ef8d12c68')},
		{
			$set: {location: "Hogwarts"},
			$inc: {age: 1}
		},
		{returnOriginal: false}
	).then(console.log)
	// client.close()
})
