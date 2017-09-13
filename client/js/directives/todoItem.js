var app = angular.module('todomvc');
app.directive('todoItem', function(){ //<todoItem> === <todo-item>
  return{
    restrict:'E',
    scope:{
      todo: '=', //양방향 바인딩
      remove: '&', //참고 바인딩. 함수 설정시 사용
      update: '&',
      edit:'&'
    },
    template: '<div class="input-group">' +
                '<span class="input-group-addon">' +
                  '<input type="checkbox" aria-label="..." ng-model="todo.completed" ng-click="update(id)">' +
                '</span>' +
                '<input type="text" class="form-control" aria-label="..." ng-model="todo.title" ng-blur="edit(todo)">'  +
                '<div class="input-group-btn">' +
                  '<button class="btn btn-danger" ng-click="remove(id)">Remove</button>' +
                '</div>'+
              '</div>'

  };
});
