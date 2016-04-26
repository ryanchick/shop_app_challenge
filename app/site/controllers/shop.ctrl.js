(function(){
	angular
		.module('shopApp')
		.controller('ShopCtrl',ShopCtrl)

	function ShopCtrl($scope,productSrv, $state,$location){
		var shopVm = this;
		shopVm.state = $state;

		//TODO #3 Capture resolved products for view
		shopVm.products;
		shopVm.categories = productSrv.categories;
		console.log(shopVm.categories)

		shopVm.openCart = openCart;
		shopVm.goToCategories = goToCategories;


		//watch for any changes to model data
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    shopVm.products = productSrv.products;
		});

		function openCart(){
			

		}

		function goToCategories(categoryName){
			$location.path('categories/'+categoryName)
		}
	}

})();


