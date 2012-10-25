
/* Services */

angular.module('questionServices', ['ngResource']).
    factory('Question', function($resource){
      return $resource('/questions.json/:id', {
        id: '@id',
        r: Math.random()
    }, {
        // query: {method:'GET', params:{}, isArray:true},
        // remove: { method: 'DELETE', params: {} },
        // create:   {method:'POST'}
      });
});
