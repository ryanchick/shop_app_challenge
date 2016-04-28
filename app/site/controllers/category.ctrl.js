(function(){

	angular
	.module('shopApp')
	.controller('CategoryCtrl',CategoryCtrl);

	function CategoryCtrl($location,$state,$stateParams,toastr,productSrv,products){
		var catVm = this;
		catVm.productSrv = productSrv;

		catVm.products = products;
		console.log(catVm.products)
		catVm.categories = CATEGORIES;
		catVm.categories = getCategories();
		console.log(catVm.products.length)

		catVm.search = '';

		catVm.currCtgry = '';
		getCategory();
		console.log($stateParams.categoryName)

		//public methods
		catVm.toProductPage = toProductPage;
		catVm.addtoCart = addtoCart;
		catVm.switchCategory = switchCategory;

		function toProductPage(productID){
			$location.path('/products/' + productID);
		}

		function switchCategory(category){
			// $state.go('categories',{'categoryName':category})
			$location.path('/categories/' + category)
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

		function getCategory(){
			catVm.currCtgry = ''
			for(var i = 0;i<productSrv.categories.length;i++)
			{
				if($stateParams.categoryName == productSrv.categories[i].category){
					catVm.currCtgry = $stateParams.categoryName;
				}
			}
		}

		function addtoCart(product){
			productSrv.addtoCart(product,1);
			toastr.success('1 ' + product.name + ' has been added to the cart!');
		}
	}
})();

var CATEGORIES = ['Food','Living','Transportation'];
