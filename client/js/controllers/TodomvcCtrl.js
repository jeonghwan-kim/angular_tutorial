var app = angular.module('todomvc',[]);

app.controller('TodomvcCtrl',function($scope, todomvcStorage){

  todomvcStorage.get(function (err, todos) {
    if (err) return;
    $scope.todos = todos;
  });

  $scope.addTodo = function(todoTitle){
    todoTitle = todoTitle.trim();
    if(!todoTitle) return;

    todomvcStorage.post(todoTitle, function(err, todos){
      // console.log("clicked and function is called "+todoTitle);
      if(err) return;
      $scope.todos = todos;

    });
    // console.log("end of submit");
    //how the fuck can i reset the field?
    // this.todomvc = null;
    // $scope.addForm.$setPristine();
    // $scope.addForm.$setUntouched();
  }

  $scope.remove = function(id){
    // console.log(id);
    if(!id) return;

    todomvcStorage.delete(id, function(err, todos){
      // console.log("clicked and function is called "+id);
      if(err) return;
      $scope.todos = todos;
    });
  }

  $scope.update = function(id){
    if(!id) return;
    // console.log("clicekd!");
    todomvcStorage.update(id, function(err, todos){
      console.log("clicked and function is called "+id);
      if(err) return;
      $scope.todos = todos;
    })
  }
  $scope.edit = function(todo){
    console.log(todo);
    todomvcStorage.edit(todo.id, todo.title, function(err, todos){
      if(err) return;
      $scope.todos = todos;
    })

  }

  $scope.clearCompleted = function(){
    todomvcStorage.deleteCompleted(function(err,todos){
      if(err) return;
      $scope.todos = todos;
    });
  }
  $scope.$watch('status', function(){
    if($scope.status === 'completed'){
      $scope.statusFilter = {completed:true};
    }else if($scope.status === 'active'){
      $scope.statusFilter = {completed:false};
    }else{
      $scope.statusFilter = {};
    }

  });



});
