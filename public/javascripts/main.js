  angular.module('wdplatform', ['ngResource'])
  .config(function ($routeProvider, $locationProvider) {
    // Set up our routes
    $routeProvider
      .when('/log-in', {
        controller: 'Table',
        templateUrl: '/UserMenu.html'
      });
    // Use HTML5 mode (History API) when changing URL
    $locationProvider.html5Mode(true);
  })
  .controller('Table', function ($scope, $resource, Contact) {
    // Use the $resource query method to grab all contacts
    $scope.contacts = Contact.query();
  });
  
