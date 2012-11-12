
angular.module('liveQuestion', ['questionServices'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: '/statics/partials/homechoice.html', controller: HomeCtrl});
    $routeProvider.when('/question', {templateUrl: '/statics/partials/question.html', controller: QuestionCtrl});
    $routeProvider.when('/synthèse', {templateUrl: '/statics/partials/question.html', controller: SyntheseCtrl});
    $routeProvider.when('/thanks/:questionType', {templateUrl: '/statics/partials/thanks.html', controller: ThanksCtrl});
    $routeProvider.when('/manage', {templateUrl: '/statics/partials/manage.html', controller: ManageCtrl});
    $routeProvider.when('/preview/:id', {templateUrl: '/statics/partials/preview.html', controller: PreviewCtrl});
    $routeProvider.when('/export', {templateUrl: '/statics/partials/export.html', controller: ExportCtrl});
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
  })

  .filter('nl2br', function() {
    return function(input, is_xhtml) {
      is_xhtml = is_xhtml || true;
      var breakTag = (is_xhtml) ? '<br />' : '<br>';
      var text = (input + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
      return text;
    };
  });


