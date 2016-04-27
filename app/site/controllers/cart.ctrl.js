(function(){
	angular
		.module('shopApp')
		.controller('CartCtrl',CartCtrl)

	function CartCtrl($scope,productSrv,$state,$uibModalInstance){
		console.log('cart control');
		var cartVm = this;

		cartVm.state = $state;
		cartVm.products;
		cartVm.goTocheckout = goTocheckout;

		cartVm.cart = productSrv.cart;
		cartVm.total = 0;
		updateTotal();
		console.log(cartVm.cart)

		cartVm.removeCart = removeCart;

		function removeCart(index){
			console.log('remove' + index)
			productSrv.removeCart(index);
			cartVm.cart = productSrv.cart;
			updateTotal();
		}

		function updateTotal(){
			cartVm.total = 0;
			for(var i = 0;i< cartVm.cart.length;i++)
			{
				cartVm.total += cartVm.cart[i].quantity * cartVm.cart[i].product.price;
			}
		}

		function goTocheckout() {
			$uibModalInstance.close();
			$state.go('checkout');
		}
	}

})();


