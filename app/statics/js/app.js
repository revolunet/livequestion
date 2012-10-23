
angular.module('liveQuestion', ['questionServices']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: '/statics/partials/question.html', controller: QuestionCtrl});
    $routeProvider.when('/thanks', {templateUrl: '/statics/partials/thanks.html', controller: ThanksCtrl});
    $routeProvider.when('/manage', {templateUrl: '/statics/partials/manage.html', controller: ManageCtrl});
    $routeProvider.when('/preview', {templateUrl: '/statics/partials/preview.html', controller: PreviewCtrl});
    $routeProvider.otherwise({redirectTo: '/'});
  }]).config(['$locationProvider', function($location) {
  $location.html5Mode(true); //now there won't be a hashbang within URLs for browers that support HTML5 history
}]);

