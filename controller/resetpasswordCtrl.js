app.controller('resetpasswordCtrl', function($scope, $state,UserService,toastr) {
  var baseURL = 'http://localhost:8080/tradeFinance/'
  $scope.submit = function() {
    $state.go('login');
    console.log($scope.useremail);
    console.log($scope.password);

  var userModel = ({
    password: $scope.password,
  });
  var url=baseURL +"resetPassword";
  console.log(userModel);
  UserService.resetPassword( userModel, url )
  toastr.success('successfully password changed','Password')
}
});
