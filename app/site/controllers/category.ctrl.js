(function(){

	angular
	.module('shopApp')
	.controller('CategoryCtrl',CategoryCtrl);

	function CategoryCtrl($location,productSrv,products){
		var catVm = this;
		catVm.productSrv = productSrv;

		catVm.products = products;
		console.log(catVm.products)
		catVm.categories = CATEGORIES;
		catVm.categories = getCategories();
		console.log(catVm.products.length)

		catVm.search = '';
		catVm.currCtgry = 'food';

		//public methods
		catVm.toProductPage = toProductPage;

		function toProductPage(productID){
			$location.path('/products/' + productID);
		}

		function getCategories(){
			var newCats = [];
			var exist = false;
			for(var i = 0; i < catVm.products.length;i++)
			{
				exist = false;
				for(var j = 0;j < newCats.length;j++)
				{
					if(newCats[j] == catVm.products[i].category)
						exist = true;
				}
				if(exist === false)
				{
					newCats.push(catVm.products[i].category)
				}
			}
			console.log(newCats)
			return newCats;
		}
	}
})();

var CATEGORIES = ['Food','Living','Transportation'];
