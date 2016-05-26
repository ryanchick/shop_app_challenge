(function(){
	angular
		.module('shopApp')
		.directive('cartTable', function(){
			return{
				scope:{},
				controller:'CartTableCtrl',
				controllerAs:'ctrl',
				templateUrl:'/site/partials/cart-table.html'
			};
		});

	angular
		.module('shopApp')
		.controller('CartTableCtrl', CartTableCtrl);

	function CartTableCtrl(productSrv){
		var cartTVm = this;
		cartTVm.cart = [];
		cartTVm.cart = productSrv.cart;
		console.log(productSrv.cart)
		cartTVm.total;
		updateTotal();
		cartTVm.removeCart = removeCart;
		cartTVm.updateTotal = updateTotal;

		function removeCart(index){
			console.log('remove' + index)
			productSrv.removeCart(index);
			cartTVm.cart = productSrv.cart;

			updateTotal();
		}

		function updateTotal(){
			cartTVm.total = 0;
			for(var i = 0;i< cartTVm.cart.length;i++)
			{
				cartTVm.total += cartTVm.cart[i].quantity * cartTVm.cart[i].product.price;
			}
		}

	}

})();