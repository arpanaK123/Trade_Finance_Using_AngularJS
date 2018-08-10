app.controller('loginCtrl', function($scope, $state,UserService,toastr) {
  var baseURL = 'http://localhost:8080/tradeFinance/'
  $scope.submit = function() {
    $state.go('home.dashBoard');
    console.log($scope.useremail);
    console.log($scope.password);

    var userModel = ({
      email: $scope.useremail,
      password: $scope.password,
    });
    var url=baseURL +"login";
    console.log(userModel);
    UserService.loginMethodPost( userModel, url )
    toastr.success('login successfull','login')
  };
});
