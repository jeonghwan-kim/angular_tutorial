var app = angular.module('todomvc');

app.factory('todomvcStorage',function($http){

  var storage = {
    todos:[],

    get:function(callback){

      $http.get('/api/todos')                 // GET /api/todos 요청
      .then(function success(response) {  // 성공
        // console.log(response);
        callback(null, angular.copy(response.data, storage.todos));
      }, function error(err) {            // 실패
        console.error(err);
        callback(err);
      });
    },
    post:function(todoTitle, callback){
      // 1. id is 1 if the list is empty
      // 2. id must be assigned regualary(must be incremental)
      // 3. id can be assinged multiple times if the last item is removed.

      // var newId = !storage.todos.length ?
      // 1:storage.todos[storage.todos.length -1].id +1;
      // var newTodo = {
      //   id: newId,
      //   title:todoTitle,
      //   completed:false
      // };
      // storage.todos.push(newTodo);
      $http({
        method:'POST',
        url:'/api/todos',
        data:{
          title:todoTitle
        }
      })                // GET /api/todos 요청
      .then(function success(response) {  // 성공
        // console.log(response);
        callback(null, angular.copy(response.data, storage.todos));
      }, function error(err) {            // 실패
        console.error(err);
        callback(err);
      });

    },
    delete:function(id, callback){
      $http({
        method:'DELETE',
        url:'/api/todos/'+id,
        data:{
          list :id
        },
        headers: {
          'Content-type': 'application/json;charset=utf-8'
        }
      })                 // DELTE /api/todos 요청
      .then(function success(response) {  // 성공
        // console.log(response.data);
        callback(null, angular.copy(response.data, storage.todos));
      }, function error(err) {            // 실패
        console.error(err.data);
      });
    },

    update:function(id, callback){
      $http({
        method:'PUT',
        url:'/api/todos/'+id,
        data:{
          list :id
        },
        headers: {
          'Content-type': 'application/json;charset=utf-8'
        }
      })                 // DELTE /api/todos 요청
      .then(function success(response) {  // 성공
        // console.log(response.data);
        // callback(null, angular.copy(response.data, storage.todos));
      }, function error(err) {            // 실패
        console.error(err.data);
      });
    },
    edit:function(id,title, callback){
      $http({
        method:'PUT',
        url:'/api/todos/'+id+'/'+title,
        data:{
          title :title
        },
        headers: {
          'Content-type': 'application/json;charset=utf-8'
        }
      })                 // DELTE /api/todos 요청
      .then(function success(response) {  // 성공
        // console.log(response.data);
        // callback(null, angular.copy(response.data, storage.todos));
      }, function error(err) {            // 실패
        console.error(err.data);
      });
    },

    deleteCompleted:function(callback){

      $http({
        method:'DELETE',
        url:'/api/todos/',
        headers: {
          'Content-type': 'application/json;charset=utf-8'
        }
      })                 // DELTE /api/todos 요청
      .then(function success(response) {  // 성공
        // console.log(response.data);
        callback(null, angular.copy(response.data, storage.todos));
      }, function error(err) {            // 실패
        console.error(err.data);
      });
    }
  }
  return storage;

});
