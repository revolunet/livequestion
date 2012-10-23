
/* Controllers */

function MainCtrl($scope, $location) {
    $scope.$location = $location;
}

function QuestionCtrl($scope, $location, Question) {

    $scope.submit = function() {
        // todo : submit $scope.newQuestion
    //      $scope.phone = new Phone();
    
    // $scope.save = function () {
    //     Phone.save({}, $scope.phone, function (res) { if (res.ok === 1) { $location.path("/phones");}}) 
    // }

        $scope.q = new Question();
        $scope.q.text = $scope.newQuestion;
        $scope.q.$save();
        console.log('SUBMIT', $scope.newQuestion);
        $location.path( "/manage" );
    };

}

function ThanksCtrl($scope, $location) {
    $scope.goback = function() {
        $location.path( "/" );
    };
}

function ManageCtrl($scope, Question) {
    $scope.questions = Question.query();
    $scope.preview = function(question) {
        if (!window.winPreview || window.winPreview.closed) window.winPreview = window.open('about:blank');
        window.winPreview.document.body.innerHTML = question.text;
        window.winPreview.focus();
    };
    $scope.remove = function(question) {
        //console.log(question);
        ///var q = Question.get({id: question.id});
        question.remove();
        //console.log('remove', question);
        //document.getElementById('question-' + question.id).contentEditable = true;
    };
}

function PreviewCtrl() {}
