const bodyParser = require('body-parser');
const urlencodeParser = bodyParser.urlencoded({ extended: false});

var data = [];

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('todo', {todos: data});
  });

  app.post('/', urlencodeParser, (req, res) => {
    data.push(req.body);
    res.json(data);
  });

  app.delete('/:item', (req, res) => {
    data = data.filter(todo => todo.item.replace(/ /g, '') !== req.params.item
    );
    res.json(data);
  });

}