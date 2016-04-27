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
	
		this.openCart = openCart;
		this.goToHome = goToHome;
		this.loginForm = loginForm;

	  	function openCart(){
	  		console.log('Modal');
	  		$uibModal.open({
	  			animation: true,
          		templateUrl: 'site/partials/cart.html',
          		controller: 'CartCtrl as ctrl'
	  		});
	  	}

	  	function goToHome(){
			$location.path('/');
		}

		function loginForm(){
			$location.path('/auth');
		}

	}





})();
