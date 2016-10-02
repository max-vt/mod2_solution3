(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json")
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems);


function FoundItems() {
  var ddo = {
    templateUrl: 'foundList.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  list.showItems = function() {
    list.found = [];
    if (!list.searchTerm) return;
    var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
    promise.then(function (response) {
      list.found = response;
    })
  }

  list.removeItem = function(index) {
    list.found.splice(index, 1);
  }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: ApiBasePath
    }).then(function (response) {
      var foundItems = response.data.menu_items.filter(function(item) {
        return item.description.indexOf(searchTerm) !== -1;
      });
      return foundItems;
    });
  };
}

})();
