(function(){

	angular
	.module('shopApp')
	.controller('CategoryCtrl',CategoryCtrl);

	function CategoryCtrl($location,productSrv,products){
		var catVm = this;
		catVm.productSrv = productSrv;

		catVm.products = products;
		catVm.categories = CATEGORIES;
		console.log(catVm.products.length)

		catVm.search = '';
		catVm.currCtgry = 'Food';

		//public methods
		catVm.toProductPage = toProductPage;
		console.log('products')
		// console.log(productSrv.getProducts())

		function toProductPage(productID){
			$location.path('/products/' + productID);
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

