app.controller('resetpasswordCtrl', function($scope,$location, $stateParams,$state,UserService,toastr) {
  var baseURL = 'http://localhost:8080/tradeFinance/'
  var url=baseURL +"resetPassword";
  $scope.submit=function(){
    var userModel = {
      password: $scope.password,
      authentication_key: $stateParams.id
    }
    console.log(userModel);
     console.log($stateParams.id);
var user=UserService.resetPassword( userModel, url )
user.then(function(response) {
  toastr.success(' password change successfully','success');
      console.log('message:::--->',response);
     $state.go('login');
    }, function(response) {
      console.log(response);
    });
  }
});
