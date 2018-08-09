app.controller('homeCtrl', function($scope, $state, $mdSidenav, products, $mdDialog) {
  $scope.showItems = function(event, info) {
    $mdDialog.show({
      locals: {
        data: info
      },
      controller: addedItemController,
      templateUrl: 'template/added-item.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose: true,
    });
  };

  function addedItemController($scope, data, $mdDialog) {
    $scope.data = data;
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
  }
  $scope.toggleLeft = buildToggler('left');
  $scope.isSidebarOpen = false;

  function buildToggler(componentId) {
    return function() {
      $scope.isSidebarOpen = !$scope.isSidebarOpen;
      $mdSidenav(componentId).toggle();
    };
  }

  $scope.addedItemsArr = [];

  $scope.onAddToCard = function(info) {
    $scope.addedItemsArr.push(info);
    console.log('$scope.addedItemsArr', $scope.addedItemsArr);
  };

  $scope.onLogout = function() {
    $state.go('login');
  };
  products.getData().then(function(response) {
    $scope.allMobilesInfo = response;
    console.log('JSON response: ', response);
  });

  $scope.stars = [{
      url: 'bower_components/material-design-icons/toggle/svg/design/star.svg'
    },
    {
      url: 'bower_components/material-design-icons/toggle/svg/design/star.svg'
    },
    {
      url: 'bower_components/material-design-icons/toggle/svg/design/star.svg'
    },
    {
      url: 'bower_components/material-design-icons/toggle/svg/design/star.svg'
    },
    {
      url: 'bower_components/material-design-icons/toggle/svg/design/star.svg'
    }
  ];



  $scope.manufacturerArr = [];
  $scope.storageArr = [];
  $scope.osArr = [];
  $scope.cameraArr = [];
  $scope.onDisplaySelectedItems = function(specsValue, specsType) {
    switch (specsType) {
      case 'manufacturer':
        onPushOrPopData(specsValue, $scope.manufacturerArr);
        break;
      case 'storage':
        onPushOrPopData(specsValue, $scope.storageArr);
        break;
      case 'os':
        onPushOrPopData(specsValue, $scope.osArr);
        break;
      case 'camera':
        onPushOrPopData(specsValue, $scope.cameraArr);
        break;
    }

    console.log('manufacturerArr:', $scope.manufacturerArr);
    console.log('storageArr:', $scope.storageArr);
    console.log('osArr:', $scope.osArr);
    console.log('cameraArr:', $scope.cameraArr);
  };

  var onPushOrPopData = function(specsValue, arr) {
    var index = arr.indexOf(specsValue); // finding the index of selected item.
    if (index !== -1) {
      // checkbox is unchecked, remove item from arr
      arr.splice(index, 1);
    } else {
      // checkbox is checked, add item in arr
      arr.push(specsValue);


    }
  }

});
