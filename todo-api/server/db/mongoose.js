const mongoose = require('mongoose')

const databaseURL = 'mongodb://localhost:27017/ToDoApp'

mongoose.Promise = global.Promise //Sets the promise type for mongoose.  Only do once
mongoose.connect(databaseURL)

module.exports = {mongoose}