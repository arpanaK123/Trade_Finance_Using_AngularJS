app.filter('matchedItemFilter', function() {
  return function(allData, manufacturerArr, storageArr, osArr, cameraArr) {
    var filteredItems = [];
    var tempData = [];
    var getMatchedItems = function(specsArray, specsType, data) {
      var matchedArr = [];
      for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        for (var j = 0; j < specsArray.length; j++) {
          var item = specsArray[j];
          if (obj.specs[specsType] === item) {
            matchedArr.push(obj);
          }
        }
      }
      return matchedArr;
    }
    if (allData !== undefined) {
      if (manufacturerArr.length > 0) {
        filteredItems = getMatchedItems(manufacturerArr, 'manufacturer', allData);
        tempData = filteredItems;
        filteredItems = [];
      } else {
        tempData = allData;
      }

      if (storageArr.length > 0) {
        filteredItems = getMatchedItems(storageArr, 'storage', tempData);
        tempData = filteredItems;
        filteredItems = [];
      }

      if (osArr.length > 0) {
        filteredItems = getMatchedItems(osArr, 'os', tempData);
        tempData = filteredItems;
        filteredItems = [];
      }

      if (cameraArr.length > 0) {
        filteredItems = getMatchedItems(cameraArr, 'camera', tempData);
        tempData = filteredItems;
        filteredItems = [];
      }
    }
    return tempData;
  };
});
