app.filter('quantityFilter', function() {
  return function(info, data) {
    return data.filter(function(item) {
      return item.id === info.id;
    }).length;
  };
});
app.filter('removeDuplicateFilter', function() {
  return function(data) {
    return data.filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    })
  };
});
