(function(){

	angular
	.module('shopApp')
	.controller('CheckoutCtrl',CheckoutCtrl);

	function CheckoutCtrl (productSrv){
		var checkVm = this;

		checkVm.cart = [];
		checkVm.cart = productSrv.cart;
		console.log(checkVm.cart)
		checkVm.total = 0;
		updateTotal();


	

		checkVm.selected = 2;

		// checkVm.addtoCart = addtoCart;
		checkVm.checkProducts = checkProducts;
		checkVm.removeCart = removeCart;

		// checkVm.product = productSrv.getProduct(1);

		function checkProducts(){
			productSrv.getProducts();
		}


	
	
		function removeCart(index){
			console.log('remove' + index)
			productSrv.removeCart(index);
			checkVm.cart = productSrv.cart;

			updateTotal();

		}

		function updateTotal(){
			checkVm.total = 0;
			for(var i = 0;i< checkVm.cart.length;i++)
			{
				checkVm.total += checkVm.cart[i].quantity * checkVm.cart[i].product.price;
			}
		}


	}


})();