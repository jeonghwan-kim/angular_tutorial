const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../../data/todos.json');
const jsonData = fs.readFileSync(dbPath,'utf8');
let todos = JSON.parse(jsonData);

const query = (req,res) => res.json(todos);

const destroy = (req,res) => {
  const todoId = req.params.id;
  const deletedTodoIdx = todos.findIndex(todo => todo.id == todoId)

  console.log("id of that object is: "+req.params.id);
  console.log("index of it is: "+deletedTodoIdx);
  todos.splice(deletedTodoIdx, 1);

  const json = JSON.stringify(todos);
  fs.writeFile(dbPath, json, 'utf8'); 
  res.json(todos);
}

const complete = (req,res) => {
  console.log(todos);
  todos = todos.filter(todo => !todo.completed)
  console.log(todos);

  const json = JSON.stringify(todos);
  fs.writeFile(dbPath, json, 'utf8');
  res.json(todos);
};

const update = (req,res)=>{
  const todoId = req.params.id;
  console.log(`id of the object that will have changed is ${todoId}`);

  const todo = todos.filter(todo => todo.id == todoId)[0];
  todo.completed = !todo.completed;

  var json = JSON.stringify(todos);
  fs.writeFile(dbPath, json, 'utf8');
  res.json(todos);
};

const updateTitle = (req,res)=>{
  const todoId = req.params.id;
  console.log(`id of the object that will have changed is ${todoId}`);

  const todo = todos.filter(todo => todo.id == todoId)[0];
  todo.title = req.params.title;
  
  var json = JSON.stringify(todos);
  fs.writeFile(dbPath, json, 'utf8');
  res.json(todos);
};

const create = (req,res) => {
  const {title} = req.params;

  if (title) return res.status(400).send('None shall pass');

  const id = todos.reduce((maxId, todo) => {
    return todo.id > maxId ? todo.id : maxId
  }) + 1;
  
  todos.push({id, title, completed: false});
  const json = JSON.stringify(todos);
  fs.writeFile(dbPath, json, 'utf8');
  res.json(todos);
};

module.exports = {query, destroy, complete, update, updateTitle, create};

