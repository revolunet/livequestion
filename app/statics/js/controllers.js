
/* Controllers */

// function MainCtrl($scope, $location) {
//     $scope.$location = $location;
//}


// user page with question and thanks
function QuestionCtrl($scope, $location, Question) {
    // submit a new question, display the thanks page
    $scope.submit = function() {
        question = new Question({text: $scope.newQuestion});
        question.$save();
        $location.path( "/thanks" );
    };
    // go back to the question form
    $scope.goback = function() {
        $location.path( "/" );
    };
}


function ManageCtrl($scope, $location, Question) {

    // initialise the questions list
    $scope.questions = Question.query();

    $scope.ask = function() {
        // create a new empty question and add it to the view
        question = new Question({text: ''});
        question.$save(function(e) {
            $scope.questions.push(question);
        });
    };

    $scope.refresh = function() {
        // refresh the question list
        $scope.questions = Question.query();
    };

    $scope.update = function(question) {
        // save the given question
        question.$save();
    };

    $scope.preview = function(question) {
        // preview given question in the preview popup
        var url = '/preview/' + question.id;
        if (!window.winPreview || window.winPreview.closed) window.winPreview = window.open(url);
        window.winPreview.document.location.hash = url;
       // window.winPreview.focus();
    };

    $scope.remove = function(question) {
        // delete the given question
        if (confirm('Etes vous sur de vouloir supprimer cette question ?')) {
            question.$remove(function(e) {
                $scope.questions.splice($scope.questions.indexOf(question), 1);
           });
        }
    };
}

function PreviewCtrl($scope, $route, Question) {
    $scope.question = Question.get({id: $route.current.params.id});
}
