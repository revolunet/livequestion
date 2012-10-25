
/* Controllers */

// function MainCtrl($scope, $location) {
//     $scope.$location = $location;
//}


// user page with question and thanks
function QuestionCtrl($scope, $location, Question) {
    // submit a new question, display the thanks page
    $scope.submit = function() {
        $question = new Question({text: $scope.newQuestion});
        $question.$save();
        if ($location.path() == '/ask') {
            $location.path( "/manage" );
            Question.query();
        } else {
            $location.path( "/thanks" );
        }
    };
    // go back to the question form
    $scope.goback = function() {
        $location.path( "/" );
    };
}


function ManageCtrl($scope, Question) {
    $scope.questions = Question.query();

    $scope.refresh = function() {
        $scope.questions = Question.query();
    };

    $scope.update = function(question) {
        question.$save();
    };
    $scope.preview = function(question) {
        var url = '/preview/' + question.id;
        if (!window.winPreview || window.winPreview.closed) window.winPreview = window.open(url);
        window.winPreview.document.location.hash = url;
        //body.innerHTML = question.text;
        window.winPreview.focus();
    };
    $scope.remove = function(question) {
        if (confirm('Etes vous sur de vouloir supprimer cette question ?')) {
            question.$remove(function(e) {
                //Question.query()
                // view should be updated...
                $scope.questions = Question.query();
                //document.getElementById('question-' + question.id).style.display = 'none';
           });
        }
    };
}

function PreviewCtrl($scope, $route, Question) {
    $scope.question = Question.get({id: $route.current.params.id});
}
