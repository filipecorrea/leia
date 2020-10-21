angular.module('myApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('editor', {
        url: '/editor',
        data: { animateMain: 'view--animate-entry' },
        views: {
          main: {
            templateUrl: 'editor/editor.html',
            controller: 'editorController'
          },
          navigation: {
            templateUrl: '_shared/navigation/navigation.html',
            controller: 'navigationController'
          }
        }
      })
  })
