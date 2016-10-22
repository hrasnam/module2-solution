(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
    //prepare the list of toBuy items
    ShoppingListCheckOffService.toBuyAddItem("Bottles of water","10");
    ShoppingListCheckOffService.toBuyAddItem("Bottles of wine","4");
    ShoppingListCheckOffService.toBuyAddItem("Cans of beer","30");
    ShoppingListCheckOffService.toBuyAddItem("Pizza","5");
    ShoppingListCheckOffService.toBuyAddItem("Bags of crisps","5");
    
    var toBuy = this;
    toBuy.empty = false;
    toBuy.items = ShoppingListCheckOffService.getToBuyItems();
    toBuy.buy = function(item,itemIndex) {
        ShoppingListCheckOffService.buy(item,itemIndex);
        toBuy.empty = ShoppingListCheckOffService.isToBuyEmpty();
    }
}
    
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;
    bought.items = ShoppingListCheckOffService.getBoughtItems();
    bought.empty = ShoppingListCheckOffService.isBoughtEmpty();
}
    
function ShoppingListCheckOffService() {
    var service = this;
    
    var toBuyItems = [];
    var boughtItems = [];
    
    service.toBuyAddItem = function (itemName, quantity) {
        var item = {
          name: itemName,
          quantity: quantity
        };
        toBuyItems.push(item);
    };
    
    service.getToBuyItems = function (){
        return toBuyItems;
    }
    
    service.buy = function(item,itemIndex) {     
        boughtItems.push(item);
        toBuyItems.splice(itemIndex,1);
    };
    
    service.getBoughtItems = function (){
        return boughtItems;
    }
    
    service.isToBuyEmpty = function (){
        if (toBuyItems.length != 0)
            return false;
        return true;
    }
    
    service.isBoughtEmpty = function (){
        if (boughtItems.length != 0)
            return false;
        console.log("It's empty!");
        return true;
    }
}
    
})();