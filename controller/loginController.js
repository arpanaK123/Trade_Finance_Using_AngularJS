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
    login.then(function fcg(response) {
      console.log(response.data.status);
        $location.path('/home');
     toastr.success('login successfully', 'user');
    },function tgfuy(res){
      console.log(res);
      toastr.error('user is not active', 'user');
    });
  };
});
