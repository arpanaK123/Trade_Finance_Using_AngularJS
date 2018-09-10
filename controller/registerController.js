app.controller('registerCtrl',function($scope, $state,UserService,toastr,$location) {
  var baseURL = 'http://localhost:8080/tradeFinance/'
  // $scope.submit = function() {
    //	$state.go('/login');

//  console.log('userModel::--', userModel);
  var url=baseURL +"registration";
  $scope.submit=function(){
    var userModel = {
      name: $scope.username,
      email: $scope.useremail,
      password: $scope.password,
      bankname: $scope.bankname,
      accountnumber: $scope.accountnumber,
      balance: $scope.balance,
      city : $scope.usercity,
      role : $scope.userrole
    }
    console.log(userModel);
  var register = UserService.registerPostData( userModel, url );
  register.then(function(response) {
  			toastr.success('registration successfull plz check mail to verify','registration');
  			console.log('registerData:::--->',response);
  			$location.path('/login');
  		}, function(response) {
  			console.log(response);
  		});
    }
// }
});
