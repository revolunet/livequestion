
angular.module('liveQuestion', ['questionServices'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: '/statics/partials/question.html', controller: QuestionCtrl});
    $routeProvider.when('/thanks', {templateUrl: '/statics/partials/thanks.html', controller: QuestionCtrl});
    $routeProvider.when('/manage', {templateUrl: '/statics/partials/manage.html', controller: ManageCtrl});
    $routeProvider.when('/preview/:id', {templateUrl: '/statics/partials/preview.html', controller: PreviewCtrl});
    $routeProvider.otherwise({redirectTo: '/'});

  }])
  // .config(['$locationProvider', function($location) {
  //   $location.html5Mode(true); //now there won't be a hashbang within URLs for browers that support HTML5 history
  // }])
  .directive('ngModelOnblur', function() { // this allow onchange firect only on blur
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attr, ngModelCtrl) {
            if (attr.type === 'radio' || attr.type === 'checkbox') return;
            
            elm.unbind('input').unbind('keydown').unbind('change');
            elm.bind('blur', function() {
                scope.$apply(function() {
                    ngModelCtrl.$setViewValue(elm.val());
                });
            });
        }
    };
  });

