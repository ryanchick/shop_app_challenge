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

	function shopNavbarCtrl($location){
		this.newTitle = '';
		this.toNewMovie = toNewMovie;

		function toNewMovie(title){
	  		$location.path('/new/' + title);
	  	}
	}

})();
