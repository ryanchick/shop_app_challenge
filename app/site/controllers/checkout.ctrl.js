(function(){

	angular
	.module('shopApp')
	.controller('CheckoutCtrl',CheckoutCtrl);

	function CheckoutCtrl ($state,productSrv,checkoutSrv){
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
		checkVm.processOrder = processOrder;
		checkVm.goBack = goBack;

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

		function processOrder(){
			console.log(checkVm.name)
			console.log(checkVm.email)
			productSrv.processOrder(checkVm.total,checkVm.name,checkVm.email);
			// $state.go('confirmation',{'orderId':newOrder.id})
			// checkoutSrv.name = checkVm.name;
			// checkoutSrv.email = checkVm.email;
		}

		function updateTotal(){
			checkVm.total = 0;
			for(var i = 0;i< checkVm.cart.length;i++)
			{
				checkVm.total += checkVm.cart[i].quantity * checkVm.cart[i].product.price;
			}
		}
		function goBack(){
    		$state.go('categories',{'categoryName':'All'})
    	}	


	}


})();