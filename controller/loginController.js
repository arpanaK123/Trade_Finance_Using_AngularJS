app.controller('loginCtrl', function($scope, $state) {
  $scope.submit = function() {
    $state.go('home.dashBoard');
    console.log($scope.useremail);
    console.log($scope.password);
  };
  // $scope.comparePassword = function(password, useremail) {
  //   if (password && useremail) {
  //     var index = useremail.indexOf('@');
  //     var userId = useremail.substr(0, index);
  //     var emailArr = Array.from(userId);
  //     var passwordArr = Array.from(password);
  //     var charMatch = emailArr.filter(function(emailchar) {
  //       return passwordArr.find(function(passwordChar) {
  //         return passwordChar === emailchar;
  //       });
  //     });
  //     if (!charMatch.length) {
  //       $scope.isMatchpasswordwithemail = false;
  //       console.log("password not match");
  //     } else {
  //       $scope.isMatchpasswordwithemail = true;
  //       console.log("password match");
  //     }
  //   }
  // };

});
