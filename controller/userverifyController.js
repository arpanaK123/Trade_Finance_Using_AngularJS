app.controller('userverifyCtrl', function($scope, $state,$location,UserService,toastr) {
  var baseURL = 'http://localhost:8080/tradeFinance/'
  var url=baseURL +"forgotPasword";
  $scope.submit=function(){
    var userModel = {
      email: $scope.useremail,
    }
    console.log(userModel);
var user=UserService.forgotPassword( userModel, url )
user.then(function(response) {
  toastr.success(' plz check your mail to verify','Email Send');
      console.log('send mail:::--->',response);
      $location.path('/login');
    }, function(response) {
      console.log(response);
    });
  }
});
