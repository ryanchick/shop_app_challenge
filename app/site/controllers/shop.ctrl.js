(function(){
	angular
		.module('shopApp')
		.controller('ShopCtrl',ShopCtrl)

	function ShopCtrl($scope,productSrv, $state){
		var shopVm = this;
		shopVm.state = $state;

		//TODO #3 Capture resolved products for view
		shopVm.products;
		shopVm.openCart = openCart;

		//watch for any changes to model data
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    shopVm.products = productSrv.products;
		});

		function openCart(){
			

		}
	}

})();


