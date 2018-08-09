app.controller('registerCtrl', function($scope, $state) {
  $scope.submit = function() {

    $state.go('login');
    console.log($scope.useremail);
    console.log($scope.password);
  }
});
