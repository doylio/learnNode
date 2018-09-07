const mongoose = require('mongoose')

mongoose.Promise = global.Promise //configures mongoose to use built in promise API
mongoose.connect('mongodb://localhost:27017/ToDoApp')

module.exports = mongoose
