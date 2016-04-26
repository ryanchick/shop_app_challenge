(function(){
	angular
		.module('shopApp')
		.controller('CartCtrl',CartCtrl)

	function CartCtrl($scope,productSrv,$state){
		var cartVm = this;
		cartVm.state = $state;
		cartVm.products;
		cartVm.goTocheckout = goTocheckout

		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    shopVm.products = productSrv.products;
		});

	function goTocheckout() {
		$state.go('checkout')		
	}
	}




})();


