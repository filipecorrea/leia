var app = angular.module('myApp', [
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
  'ngCookies',
  'angular-jwt',
  'ngSanitize',
  'ngSocial'
]).config(function($locationProvider,  $stateProvider, $urlRouterProvider){
    //$locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/editor");
});

app.run(function($rootScope, $state){
  $rootScope.state = $state;
});
