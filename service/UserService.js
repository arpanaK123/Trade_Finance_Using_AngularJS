app.factory('UserService', function($http) {
  var serviceobj =[];

  	serviceobj.registerPostData = function(data,url) {
  		console.log(data);
  		return $http({
  			method : "POST",
  			headers:{
  				"Content-Type":"application/json"
  			},
  			url : url,
  			data:data
  		})
  	}

    serviceobj.loginMethodPost = function(data,url) {
      //console.log(data);
     // console.log(response.data);
      return $http({
        method : "POST",
        headers:{
          "Content-Type":"application/json"
        },
        url : url,
        data:data
      })
    }

    serviceobj.forgotPassword = function(data,url) {
      console.log(data);
      return $http({
        method : "POST",
        headers:{
          "Content-Type":"application/json"
        },
        url : url,
        data:data
      })
    }

    serviceobj.resetPassword = function(data,url) {
      console.log(data);
      return $http({
        method : "POST",
        headers:{
          "Content-Type":"application/json"
        },
        url : url,
        data:data
      })
    }


    serviceobj.createContract = function(data,url) {
      console.log(data);
      return $http({
        method : "POST",
        headers:{
          "Content-Type":"application/json"
        },
        url : url,
        data:data
      })
    }
return serviceobj;
});
