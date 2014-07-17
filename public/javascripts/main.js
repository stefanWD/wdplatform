
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
      url: '/user-account',
      headers: {'Content-type': 'application/json'}
    
    }).
    success(function(data, status, headers, config) {
      $scope.name=data.firstName+' '+data.lastName;
      $scope.countries=['A','B','C'];
      $scope.cities=['C','D'];
      $scope.role=data.role;
      $scope.supervisor=data.supervisor;
      $scope.skype=data.skype;
      $scope.gmailAccountUrl=data.gmailAccountUrl;
      $scope.pictureUrl = data.pictureUrl;
      console.log(data.pictureUrl);
    }).
    error(function(data, status, headers, config) {

    });

    
});
