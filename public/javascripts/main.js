
var app=angular.module('wdplatform',['ui.router']);
app.config(function($stateProvider, $urlRouterProvider) {
$stateProvider
.state('panel',{
  url:'',
  views:{
    'nav':{
      templateUrl:'User/UserNav.html'
    },
    'nav-side':{
      templateUrl:'User/UserNavSide.html'
    },
    'content':{
      controller:'GetAccount',
      templateUrl:'User/UserAccount.html'
    }
  }
});

});

app.controller('GetAccount', function($scope,$http) {
     $http({method: 'Post',
      url: '/user-account'
    
    }).
    success(function(data, status, headers, config) {
      alert(data);
    }).
    error(function(data, status, headers, config) {

    });

    
});
