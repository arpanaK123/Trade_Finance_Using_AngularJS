app.factory('UserService', function($http, $stateParams) {
  var serviceobj = [];

  serviceobj.registerPostData = function(data, url) {
    console.log(data);
    return $http({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      url: url,
      data: data
    })
  }

  serviceobj.loginMethodPost = function(data, url) {
    console.log(data);
    return $http({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      url: url,
      data: data
    })
  }

  serviceobj.forgotPassword = function(data, url) {
    console.log(data);
    return $http({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      url: url,
      data: data
    })
  }

  serviceobj.resetPassword = function(data, url) {
    console.log(data);
    return $http({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      url: url,
      data: data
    })
  }
  $scope.submitResetPassword = function() {

    if ($scope.resetFormPassword == $scope.resetFormConfirmPassword) {

      console.log($stateParams.key);
      var resetPasswordData = {

        newPassword: $scope.resetFormPassword,
        uuid: $stateParams.id
      };

      return serviceobj;
    });
