
/* Controllers */

// function MainCtrl($scope, $location) {
//     $scope.$location = $location;
//}


function HomeCtrl($scope, $location, Question) {
    $scope.question = function() {
        $location.path( "/question" );
    };
    $scope.synthese = function() {
        $location.path( "/synthèse" );
    };
}

// user page with question and thanks
function QuestionCtrl($scope, $location, Question) {
    // submit a new question, display the thanks page;
    if (!$scope.questionType) $scope.questionType = 'question';
    if (!$scope.questionHelp) $scope.questionHelp = 'Posez votre question';
    if (!$scope.theme) $scope.theme = 'question';
    var oldData = JSON.parse(localStorage.getItem($scope.questionType)) || null;
    if ($scope.theme != 'question') {
        if (oldData && oldData.text) $scope.newQuestion = oldData.text;
        if (oldData && oldData.theme) $scope.theme = oldData.theme;
    }
    $scope.submit = function() {
        $scope.busy = true;
        var data = {text: $scope.newQuestion, theme: $scope.theme};
        question = new Question(data);
        localStorage.setItem($scope.questionType, JSON.stringify(data));
        question.$save({}, function() {
            $location.path( "/thanks/" + $scope.questionType);
        }, function() {
            alert('Erreur d\'envoi, re-essayez');
            $scope.busy = false;
        });
    };
    // go home
    $scope.home = function() {
        $location.path( "/" );
    };

}

// user page with question and thanks
function SyntheseCtrl($scope, $location, Question) {
    $scope.questionType = 'synthèse';
    $scope.questionHelp = 'Saisissez votre synthèse';
    $scope.themes = [
        'Enquête Groupe 1',
        'Enquête Groupe 2',
        'Technique',
        'Ressources humaines',
        'Commerce',
        'Finance'
    ];
    $scope.theme = $scope.themes[0];
    return QuestionCtrl($scope, $location, Question);
}

function ThanksCtrl($scope, $location, $routeParams) {
    $scope.questionType = $routeParams.questionType;
    $scope.goback = function() {
        $location.path( "/" + $scope.questionType );
    };
     $scope.home = function() {
        $location.path( "/" );
    };
}

function ManageCtrl($scope, $location, Question) {

    // initialise the questions list
    $scope.questionType = "question";
    $scope.questions = Question.query();

    $scope.showQuestions = function() {
        $scope.questionType = 'question';
    };

    $scope.showSyntheses = function() {
        $scope.questionType = 'synthèse';
    };

    $scope.themeFilter = function(question) {
        if (!question.theme || question.theme==='') return false;
        var isQuestion = (question.theme == 'question');
        if ($scope.questionType == 'question') return isQuestion;
        else return !isQuestion;

    };

    $scope.refresh = function() {
        // refresh the question list
        $scope.questions = Question.query();
    };

    $scope.update = function(question) {
        // save the given question
        question.$save();
    };

    $scope.done = function(question) {
        question.done = true;
        question.$save();
    };

    $scope.preview = function(question) {
        // preview given question in the preview popup
        var url = '/preview/' + question.id;
        if (!window.winPreview || window.winPreview.closed) window.winPreview = window.open(url, 'preview');
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

    $scope.download = function() {
        window.open('/#/export');
    };

}

function ExportCtrl($scope, Question) {
    $scope.questions = Question.query();
    $scope.questionsFilter = function(question, theme) {
        if (question.theme && question.theme == 'question' && question.text !== '') return true;
    };
    $scope.synthesesFilter = function(question, theme) {
        if (question.theme && question.theme !== '' && question.theme !== 'question'  && question.text !== '') return true;
    };
}

function PreviewCtrl($scope, $route, Question) {
    $scope.question = Question.get({id: $route.current.params.id});
}
