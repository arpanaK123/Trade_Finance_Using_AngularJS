app.service('products', function($http) {
  this.getData = function() {
    return $http.get("products.json").then(
      function(response) {
        // console.log(response.data);
        return response.data;
      });
  }
});
