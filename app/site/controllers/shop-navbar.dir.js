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

	function shopNavbarCtrl($location, $uibModal){
		this.newTitle = '';
		this.toNewMovie = toNewMovie;
		this.openCart = openCart;

		function toNewMovie(title){
	  		$location.path('/new/' + title);
	  	}

	  	function openCart(){
	  		console.log('Modal');
	  		$uibModal.open({
	  			animation: true,
          		templateUrl: 'site/partials/cart.html',
	  		});
	  	}
	}

})();
