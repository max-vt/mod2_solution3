(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController )
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json")
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems);


function FoundItems() {
  var ddo = {
    templateUrl: 'foundList.html',
    scope: {
      found: '<',
    },
    controller: NarrowItDownController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  var promise = MenuSearchService.getMatchedMenuItems();

  promise.then(function (response) {
    console.log(response);
    list.found  = response;
  })

  list.removeItem = function(index) {
    list.found.slice(index, 1);
  }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService() {
  var service = this;
  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: ApiBasePath
    });
    return response;
  };
}

})();
