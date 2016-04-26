(function(){
	angular
		.module('shopApp')
		.controller('CartCtrl',CartCtrl)

	function CartCtrl($scope,productSrv,$state){
		var cartVm = this;
		cartVm.state = $state;
		cartVm.products;
		cartVm.goTocheckout = goTocheckout;

		cartVm.cart = productSrv.cart;
		cartVm.total = 0;
		updateTotal();
		console.log(cartVm.cart)

		cartVm.removeCart = removeCart;
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

		function goTocheckout() {
			$state.go('checkout');		
		}
	}

})();


