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
      console.log(response.data.statusCode);
      $scope.alluserInfo = response;
      console.log('JSON response: ', response);
      console.log("Data response: -->"+response.data.usermodel.name);
      //localstorage.setItem("data",response);
     //window.localStorage.setItem("data", JSON.stringify(response));
      // $scope.data= JSON.parse(localStorage.getItem("data"));
    // console.log("local storage: "+data);
        $location.path('/home');
     toastr.success('login successfully', 'user');
    },function result(res){
      console.log(res);
      toastr.error('user is not active', 'user');
    });
  };
});
