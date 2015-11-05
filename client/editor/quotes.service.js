angular.module('myApp')
.service('quotesService',function($http, $q){
  var self = this;

  self.showAsList = true;

  self.listQuotes = function() {
      var deferred = $q.defer();

      $http.get('/api/quotes.json')
      .success(function(data){
          deferred.resolve(data);
      })
      .error(function(error){
          deferred.reject();
      });
      return deferred.promise;
  };

  return self;
});
