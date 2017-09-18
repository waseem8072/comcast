var myApp = angular.module('myApp',['ui.router']);
myApp.factory('InfoService', function($http) {
    var obj = {content:null};
    $http.get('data.json').success(function(data) {
        obj.content = data;
        console.log(obj);
    });
    return obj;
});
/*myApp.config(function ($httpProvider){
    var friends;
    $http.get('data.json').success(function (data){
        $scope.friends = data;
        console.log(friends);
    });
})*/
myApp.controller('categoryController',function($scope,$http) {
    console.log('----- category')
    $http.get('data.json').success(function (data){
        // $scope.friends = data;
        // [ {name: 'abs', c1: 200, c2 500, c3: 5} ]
        var newData = []
        data.forEach(function(item){
            var doesExist = newData.find(function(el){
                return el.name == item.name
            })
            if (doesExist){
                doesExist[item.category] = item.amount
            } else {
                var newObject = {
                    name: item.name
                }

                newObject[item.category] = item.amount
                newData.push(newObject)
            }
        })
        $scope.final = newData
        console.log(newData)

    });

})



// Controller
myApp.controller('myController',function($scope,$http){
    var friends;
    console.log('----- data')

    $http.get('data.json').success(function (data) {
        $scope.friends = data;
        console.log(data);

    })

        // column to sort
    $scope.column = 'name';

    // sort ordering (Ascending or Descending). Set true for desending
    $scope.reverse = false;

    // called on header click
    $scope.sortColumn = function(col){
        $scope.column = col;
        if($scope.reverse){
            $scope.reverse = false;
            $scope.reverseclass = 'arrow-up';
        }
        else{
            $scope.reverse = true;
            $scope.reverseclass = 'arrow-down';
        }
    };

    // remove and change class
    $scope.sortClass = function(col){
        if($scope.column == col ){
            if($scope.reverse){
                return 'arrow-down';
            }else{
                return 'arrow-up';
            }
        }else{
            return '';
        }
    }

});

myApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url:"/",
            templateUrl: 'employee.html',
            controller: 'myController'
        })
        .state('category', {
            url: "/category",
            templateUrl: 'category.html',
            controller: 'categoryController'
        })

    $urlRouterProvider.otherwise('/');
})