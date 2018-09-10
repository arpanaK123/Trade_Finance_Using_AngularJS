app.controller('loginCtrl', function($scope, $state, $location, UserService, toastr) {
  var baseURL = 'http://localhost:8080/tradeFinance/'
  var url = baseURL + "login";
  $scope.submit = function() {
    var userModel = {
      email: $scope.useremail,
      password: $scope.password
    }
    console.log(userModel);
    var login = UserService.loginMethodPost(userModel, url);
    login.then(function functions(response) {
      console.log(response.data.status);
      console.log("login data:--------"+response.data.userModel);
console.log("----"+response.user)
        $location.path('/home');
     toastr.success('login successfully', 'user');
    },function result(res){
      console.log(res);
      toastr.error('user is not active', 'user');
    });
  };
});
