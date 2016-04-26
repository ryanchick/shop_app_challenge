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

var PRODUCT_DATA = 
[{
	productId:'1',
	name:'Item1',
	image:'http://www.online-image-editor.com//styles/2014/images/example_image.png',
	description:'Desc1',
	category:'Food',
	price:'10.00',
	quantity:'5',
	status:'1'
	},{
	productId:'2',
	name:'Item2',
	image:'http://www.online-image-editor.com//styles/2014/images/example_image.png',
	description:'Desc2',
	category:'Food',
	price:'10.00',
	quantity:'5',
	status:'1'
	},{
	productId:'3',
	name:'Item3',
	image:'http://www.online-image-editor.com//styles/2014/images/example_image.png',
	description:'Desc3',
	category:'Food',
	price:'10.00',
	quantity:'5',
	status:'1'
	},{
	productId:'4',
	name:'Item4',
	image:'http://www.online-image-editor.com//styles/2014/images/example_image.png',
	description:'Desc4',
	category:'Living',
	price:'10.00',
	quantity:'5',
	status:'1'
	},{
	productId:'5',
	name:'Item5',
	image:'http://www.online-image-editor.com//styles/2014/images/example_image.png',
	description:'Desc5',
	category:'Living',
	price:'10.00',
	quantity:'5',
	status:'1'
	},{
	productId:'6',
	name:'Item6',
	image:'http://www.online-image-editor.com//styles/2014/images/example_image.png',
	description:'Desc6',
	category:'Living',
	price:'10.00',
	quantity:'5',
	status:'1'
	},{
	productId:'7',
	name:'Item7',
	image:'http://www.online-image-editor.com//styles/2014/images/example_image.png',
	description:'Desc7',
	category:'Transportation',
	price:'10.00',
	quantity:'5',
	status:'1'
	},{
	productId:'8',
	name:'Item8',
	image:'http://www.online-image-editor.com//styles/2014/images/example_image.png',
	description:'Desc8',
	category:'Transportation',
	price:'10.00',
	quantity:'5',
	status:'1'
}];

