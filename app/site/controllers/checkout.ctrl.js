(function(){

	angular
	.module('shopApp')
	.controller('CheckoutCtrl',CheckoutCtrl);

	function CheckoutCtrl ($state,$scope,productSrv,checkoutSrv,toastr){
		var checkVm = this;

		checkVm.cart = [];
		checkVm.cart = productSrv.cart;
		console.log(checkVm.cart)
		checkVm.total = 0;
		updateTotal();
		checkVm.submit = false;
		checkVm.selected = 1;

		checkVm.shipOptions = [
		{label:'Standard Shipping - $10.00',cost:10.00},
		{label:'Express Shipping - $25.00',cost:25.00},
		{label:'Magical Teleportation - $25,000.00',cost:25000.00}
		]
		checkVm.ship = checkVm.shipOptions[0]



		// checkVm.addtoCart = addtoCart;
		checkVm.checkProducts = checkProducts;
		checkVm.removeCart = removeCart;
		checkVm.processOrder = processOrder;
		checkVm.goBack = goBack;
		checkVm.updateTotal = updateTotal;

		$scope.$watchCollection(function(){
        	return checkVm.cart;
    	}, function (newValue) {
          		updateTotal();
    	});

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

		function processOrder(isValid){
			if(!isValid){
				toastr.error('Information not valid!')
				checkVm.submit = true;
			}else{
				console.log(checkVm.name)
				var customer = {
					name:checkVm.name,
					email:checkVm.email,
					address:checkVm.address,
					city:checkVm.city,
					province:checkVm.province,
					postal:checkVm.postal,
					shipping:checkVm.ship
				}
				var card = {
					name:checkVm.card_name,
					number:checkVm.card_number,
					expiry:checkVm.card_expiry
				}
				console.log(checkVm.email)
				productSrv.processOrder(checkVm.total,customer,card);
				// $state.go('confirmation',{'orderId':newOrder.id})
				// checkoutSrv.name = checkVm.name;
				// checkoutSrv.email = checkVm.email;
			}
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