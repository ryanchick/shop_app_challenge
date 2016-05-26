(function(){

	angular
	.module('shopApp')
	.controller('CheckoutCtrl',CheckoutCtrl);

	function CheckoutCtrl ($state,$scope,productSrv,toastr){
		var checkVm = this;

		checkVm.cart = [];
		checkVm.cart = productSrv.cart;
		console.log(checkVm.cart)
		checkVm.total = 0;
		updateTotal();
		checkVm.submit = false;
		checkVm.selected = 1;

		checkVm.shipOptions = [
		{label:'Standard Shipping (2-4 weeks) - $10.00',cost:10.00, time:'2-4 weeks', method:'Standard Shipping'},
		{label:'Express Shipping (3-5 days) - $25.00',cost:25.00, time:'3-5 days', method:'Express Shipping'},
		{label:'Express Priority (Next day) - $100.00',cost:100.00, time:'Next day', method:'Express Priority'},
		{label:'Magical Teleportation (Instant once invented) - $250,000.00',cost:250000.00, time:'As soon as someone invents it', method:'Magical Teleportation'}
		]
		checkVm.ship = checkVm.shipOptions[0]



		// checkVm.addtoCart = addtoCart;
		checkVm.checkProducts = checkProducts;
		checkVm.removeCart = removeCart;
		checkVm.processOrder = processOrder;
		checkVm.goBack = goBack;
		checkVm.updateTotal = updateTotal;

		$scope.$watch(function(){
        	return checkVm.cart;
    	}, function (newValue) {
          		updateTotal();
    	},true);

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
				toastr.error('Some information is missing or invalid!')
				checkVm.selected = 2;
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