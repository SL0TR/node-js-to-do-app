const bodyParser = require('body-parser');
const urlencodeParser = bodyParser.urlencoded({ extended: false});
const mongoose = require('mongoose');

// connect to the databse
mongoose.connect('mongodb://admin:admin1234@ds021036.mlab.com:21036/todo-nodejs');

// Create a schema - this is like a blueprint for out data
const todoSchema = new mongoose.Schema({
  item: String 
})

var Todo = mongoose.model('Todo', todoSchema);

module.exports = (app) => {
  app.get('/', (req, res) => {

    // get data from mongodb and pass it to the view
    Todo.find({}, (err, data) => {
      if(err) throw err;
      res.render('todo', {todos: data});

    })
  });

  app.post('/', urlencodeParser, (req, res) => {
    
    // get data from the view and add it to mongodb
    let newTodo = Todo(req.body).save( (err, data) => {
      if (err) throw err;
      res.json(data);
    })
  });

  app.delete('/:item', (req, res) => {

    let deletedItem = req.params.item;
    deletedItem = deletedItem.substring(1);

    // delete the requested item from mongodb
    Todo.find({ item: deletedItem }).remove( (err, data) => {
      if (err) throw err;
      res.json(data);
    })
  });

}