(function(){

  angular
    .module('shopApp')
    .service('cartSrv',CartService);

  function CartService($state,api){
  	var self = this;
  	self.cart = [];
  }

})();