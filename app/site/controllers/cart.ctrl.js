(function(){
	angular
		.module('shopApp')
		.controller('CartCtrl',CartCtrl)

	function CartCtrl($scope,productSrv,$state){
		var cartVm = this;
		cartVm.state = $state;
		cartVm.products;
		cartVm.goTocheckout = goTocheckout;
<<<<<<< HEAD

		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    shopVm.products = productSrv.products;
		});
=======
		cartVm.cart = productSrv.cart;
		cartVm.total = 0;
		updateTotal();
		console.log(cartVm.cart)

		// $scope.$watch(function(){
	 //    	return productSrv.products;
		// }, function (newValue) {
		//     shopVm.products = productSrv.products;
		// });

		function removeCart(index){
			console.log('remove' + index)
			productSrv.removeCart(index);
			cartVm.cart = productSrv.cart;
			updateTotal();
		}

		function updateTotal(){
			for(var i = 0;i< cartVm.cart.length;i++)
			{
				cartVm.total += cartVm.cart[i].quantity * cartVm.cart[i].product.price;
			}
		}
>>>>>>> NatashaThirlwell/master

		function goTocheckout() {
			$state.go('checkout');		
		}
	}

})();


