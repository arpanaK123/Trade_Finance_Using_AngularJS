app.controller('userverifyCtrl', function($scope, $state,UserService,toastr) {
  var baseURL = 'http://localhost:8080/tradeFinance/'
  $scope.submit = function() {
    $state.go('login');
    console.log($scope.useremail);
  var userModel = ({
    email: $scope.useremail,
  });
  var url=baseURL +"forgotPasword";
  console.log(userModel);
  UserService.forgotPassword( userModel, url )
  toastr.success(' plz check your mail to verify','Email Send')
  }
});
