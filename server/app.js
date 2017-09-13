// part 1
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const todoApi = require('./api/todo');


//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// static files
app.use('/', express.static(path.join(__dirname, '../client')));

// api routes
app.use('/api/todos', todoApi);

// part 2
app.get('/',  (req, res) => {
  res.sendfile('index.html')
});

// part 3
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
