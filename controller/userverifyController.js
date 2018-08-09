app.controller('userverifyCtrl', function($scope, $state) {
  $scope.submit = function() {
    $state.go('register');
  }
});
