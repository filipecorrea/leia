angular.module('myApp')
.config(function ($stateProvider) {
  $stateProvider
    .state('example',{
      url: '/example',
      data: {'animateMain': 'view--animate-entry'},
      views: {
        'main': {
          templateUrl: 'editor/editor.html',
          controller: 'exampleController'
        },
        'navigation': {
          templateUrl: '_shared/navigation/navigation.html',
          controller: 'navigationController'
        }
      }
    });
});
