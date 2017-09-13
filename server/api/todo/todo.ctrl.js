const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../../data/todos.json');
const jsonData = fs.readFileSync(dbPath,'utf8');
let todos = JSON.parse(jsonData);

const query = (req,res) => res.json(todos);

const show = (req,res) => {
  let deletedTodoIdx;
  for(i=0;i<todos.length;i++){
    if(todos[i].id == req.params.id)
    deletedTodoIdx = i;
  }

  console.log("id of that object is: "+req.params.id);
  console.log("index of it is: "+deletedTodoIdx);
  todos.splice(deletedTodoIdx, 1);

  const json = JSON.stringify(todos);
  fs.writeFile(dbPath, json, 'utf8');
  res.json(todos);
}

const destroy = (req,res) => {
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
  fs.writeFile(dbPath, json, 'utf8');
  res.json(todos);
};

const update = (req,res)=>{
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
  fs.writeFile(dbPath, json, 'utf8');
  res.json(todos);
};

const updateTitle = (req,res)=>{
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
  fs.writeFile(dbPath, json, 'utf8');
  res.json(todos);
};

const create = (req,res) => {
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
    fs.writeFile(dbPath, json, 'utf8');
    res.json(todos);
};

module.exports = {query, show, destroy, update, updateTitle, create};

