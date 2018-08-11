app.controller('resetpasswordCtrl', function($scope,$location, $state,UserService,toastr) {
  var baseURL = 'http://localhost:8080/tradeFinance/'
  var url=baseURL +"resetPassword";
  $scope.submit=function(){
    var userModel = {
      password: $scope.password,
    }
    console.log(userModel);
var user=UserService.resetPassword( userModel, url )
user.then(function(response) {
  toastr.success(' password change successfully','success');
      console.log('message:::--->',response);
      $location.path('/login');
    }, function(response) {
      console.log(response);
    });
  }
});
