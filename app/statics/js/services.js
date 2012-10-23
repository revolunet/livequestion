
/* Services */

angular.module('questionServices', ['ngResource']).
    factory('Question', function($resource){
      return $resource('/questions.json', {}, {
        query: {method:'GET', params:{}, isArray:true},
        remove: { method: 'DELETE', params: {} },
        create:   {method:'POST'}
      });
});
