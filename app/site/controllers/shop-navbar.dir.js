(function(){
	angular
		.module('shopApp')
		.directive('shopNavbar', function(){
			return{
				scope:true,
				controller:'shopNavbarCtrl',
				controllerAs:'ctrl',
				templateUrl:'/site/partials/shop-navbar.html'
			};
		});

	angular
		.module('shopApp')
		.controller('shopNavbarCtrl', shopNavbarCtrl);
		
	function shopNavbarCtrl($location, $uibModal, $scope,$state, productSrv){
		var navVm = this;
		
		navVm.logged = false;
		navVm.is_admin = false;
		navVm.cart = productSrv.cart;
		navVm.cartCount; 
		cartTotal();

		//check for cart changes
		$scope.$watch(function(){
        	return productSrv.cart;
    	}, function (newValue) {
          		navVm.cart = productSrv.cart;
          		cartTotal();
    	},true);

		if(localStorage.authToken){
			navVm.logged = true;
		}

		console.log($state.current.name)
		if($state.current.name.search('admin') != -1)
		{
			navVm.is_admin=true;
		}

		//public methods
		navVm.openCart = openCart;
		navVm.goToHome = goToHome;
		navVm.loginForm = loginForm;

	  	function openCart(){
	  		console.log('Modal');
	  		$uibModal.open({
	  			animation: true,
          		templateUrl: 'site/partials/cart.html',
          		controller: 'CartCtrl as ctrl'
	  		});
	  	}

	  	function cartTotal(){
	  		navVm.cartCount = 0;
	  		// console.log(navVm.cart);
	  		for(var i in navVm.cart){
	  			// console.log(navVm.cart[i].quantity)
	  			navVm.cartCount += navVm.cart[i].quantity;
	  			// console.log(navVm.cartCount)
	  		}
	  	}

	  	function goToHome(){
			$location.path('/');
		}

		function loginForm(){
			$location.path('/auth');
		}

	}





})();
