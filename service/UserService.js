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
      let options = {
        headers:{
          "Content-Type":"application/json",
          "token":JSON.parse(localStorage.getItem("token"))
        }
      }
      return $http.post(url, data, options);
    }

    serviceobj.getAllContract = function(url) {
      let options = {
        headers:{
          'Content-Type': 'application/json',
          "token":JSON.parse(localStorage.getItem("token"))
        }
      }
      return $http.post(url,{}, options);
    }
    serviceobj.getBalanceBy = function(url) {
      let options = {
        headers:{
          'Content-Type': 'application/json',
          "token":JSON.parse(localStorage.getItem("token"))
        }
      }
      return $http.post(url,{}, options);
    }

    serviceobj.updateContractByToken = function(data, url) {
      let options = {
        headers:{
          'Content-Type': 'application/json',
          "token":JSON.parse(localStorage.getItem("token"))
        }
      }
  
      return $http.post(url,data, options);
    }
    serviceobj.getContractBy = function(data,url) {
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
