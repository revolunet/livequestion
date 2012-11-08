
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
    // submit a new question, display the thanks page
    if (!$scope.questionType) $scope.questionType = 'question';
    if (!$scope.questionHelp) $scope.questionHelp = 'Posez votre question';
    if (!$scope.theme) $scope.theme = 'question';
    $scope.submit = function() {
        question = new Question({text: $scope.newQuestion, theme: $scope.theme});
        question.$save();
        $location.path( "/thanks/" + $scope.questionType);
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
        'Concurrence - groupe 1',
        'Concurrence - groupe 2',
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
    // go back
    $scope.goback = function() {
        $location.path( "/" + $scope.questionType );
    };
}

function ManageCtrl($scope, $location, Question) {

    // initialise the questions list
    $scope.questionType = "question";
    $scope.questions = Question.query();

    // function filterQuestion() {
    //     $scope.questions = Question.query();

    // }
    // filterQuestion();

    // $scope.ask = function() {
    //     // create a new empty question and add it to the view
    //     question = new Question({text: ''});
    //     question.$save(function(e) {
    //         $scope.questions.push(question);
    //     });
    // };

    $scope.showQuestions = function() {
        $scope.questionType = 'question';
       // $scope.questions = Question.query({theme: 'question'});
    };

    $scope.showSyntheses = function() {
        $scope.questionType = 'synthèse';
     //   $scope.questions = Question.query({theme: 'question'});
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
