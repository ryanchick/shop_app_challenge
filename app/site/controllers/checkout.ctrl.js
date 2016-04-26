(function(){

	angular
	.module('shopApp')
	.controller('CheckoutCtrl',CheckoutCtrl);

	function CheckoutCtrl (productSrv){
		var checkVm = this;

		checkVm.addtoCart = addtoCart;
		checkVm.checkProducts = checkProducts;
		// checkVm.product = productSrv.getProduct(1);

		console.log(checkVm.product)

		function addtoCart(){
			console.log('ADDCART')
			productSrv.getProduct('2')
				.then(function(res){
					console.log(res)
				})
		}

		function checkProducts(){
			productSrv.getProducts();
		}


	}


})();