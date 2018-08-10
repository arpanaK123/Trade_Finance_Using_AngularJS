app.controller('registerCtrl',function($scope, $state,UserService,toastr) {
  var baseURL = 'http://localhost:8080/tradeFinance/'
  $scope.submit = function() {
    $state.go('login');
    console.log($scope.useremail);
    console.log($scope.password);

  var userModel = ({
    name: $scope.username,
    email: $scope.useremail,
    password: $scope.password,
    city : $scope.usercity,
    role : $scope.userrole
  });
  var url=baseURL +"registration";
  console.log(userModel);
  UserService.registerPostData( userModel, url )
  toastr.success('registration successfull plz check your mail to verify','register')
}
});
