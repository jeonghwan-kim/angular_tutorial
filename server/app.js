// part 1
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const apiRouter = express.Router();

app.use(apiRouter);
//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static(path.join(__dirname, '../client')));

const test = fs.readFileSync('data/todos.json','utf8');
let todos = JSON.parse(test);

app.get('/api/todos', (req,res) => res.json(todos));

apiRouter.delete('/api/todos/:id', (req,res) => {
  let deletedTodoIdx;
  for(i=0;i<todos.length;i++){
    if(todos[i].id == req.params.id)
    deletedTodoIdx = i;
  }

  console.log("id of that object is: "+req.params.id);
  console.log("index of it is: "+deletedTodoIdx);
  todos.splice(deletedTodoIdx, 1);

  const json = JSON.stringify(todos);
  fs.writeFile('data/todos.json', json, 'utf8');
  res.json(todos);
});

apiRouter.delete('/api/todos/', (req,res) => {
  console.log(todos);
  const old_todos = todos;
  todos = [];
  for(let i in old_todos){
    val  = old_todos[i];
    if(!val.completed){
      //do something

      todos.push(val);
    }
  }
  console.log(todos);
  // angular.copy(incompleteTodos, storage.todos);
  const json = JSON.stringify(todos);
  fs.writeFile('data/todos.json', json, 'utf8');
  res.json(todos);
});

apiRouter.put('/api/todos/:id', (req,res)=>{
  console.log("id of the object that will have changed is "+req.params.id);

  for(i=0;i<todos.length;i++){
    if(todos[i].id == req.params.id){
      console.log("i is "+i);
      console.log("it was "+ todos[i].completed);
      todos[i].completed ? todos[i].completed=false:todos[i].completed=true;
      console.log("but now it's " + todos[i].completed);
    }
  }
  var json = JSON.stringify(todos);
  fs.writeFile('data/todos.json', json, 'utf8');
  res.json(todos);

});

apiRouter.put('/api/todos/:id/:title', (req,res)=>{
  console.log("id of the object that will have changed is "+req.params.id);

  for(i=0;i<todos.length;i++){
    if(todos[i].id == req.params.id){
      console.log("i is "+i);
      console.log("it was "+ todos[i].title);
      todos[i].title = req.params.title;
      console.log("but now it's " + todos[i].title);
    }
  }
  var json = JSON.stringify(todos);
  fs.writeFile('data/todos.json', json, 'utf8');
  res.json(todos);

});

app.post('/api/todos', (req,res) => {

  const idOfLastItem = todos.length - 1;
  // console.log(todos[idOfLastItem]);
  // console.log(req.body.title);
  if(!req.body.title){

    return res.status(400).send('None shall pass');
  }
  const newId = !todos.length ?
  1: todos[idOfLastItem].id+1;

  const newTodo = {
    "id":newId,
    "title":req.body.title,
    "completed":false
  };
  todos.push(newTodo);
  const json = JSON.stringify(todos);
  fs.writeFile('data/todos.json', json, 'utf8');
  res.json(todos);
});

// part 2
app.get('/',  (req, res) => {
  res.sendfile('index.html')
});

// part 3
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
