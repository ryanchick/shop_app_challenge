(function(){

  angular
    .module('shopApp')
    .service('checkoutSrv',CheckoutService);

  function CheckoutService($state,api){
  	var self = this;
  	self.name = '';
  	self.email = '';
  }

})();