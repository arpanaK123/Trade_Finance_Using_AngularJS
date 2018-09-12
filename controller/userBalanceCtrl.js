app.controller('userBalanceCtrl', function($scope, $state, $location, UserService, toastr) {
    var baseURL = 'http://localhost:8080/tradeFinance/'
    var url = baseURL + "getBalance";
    $scope.submit = function() {
      var userModel = {
        accountnumber: $scope.accountnumber
      }
      console.log(userModel);
      var login = UserService.getBalanceBy(userModel, url);
      login.then(function functions(response) {
        console.log(response.data.status);
        console.log(response.data.statusCode);
        $scope.alluserInfo = response;
        console.log("alluserInfo--->"+$scope.alluserInfo);
        console.log('JSON response: ', response);
          $location.path('/home');
       toastr.success('login successfully', 'user');
      },function result(res){
        console.log(res);
        toastr.error('user is not active', 'user');
      });
    };
  });
  