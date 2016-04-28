(function(){
	'use strict';

	angular
		.module('shopApp',['ui.router', 'ui.bootstrap','ngMessages','toastr']);


	angular
		.module('shopApp')
		.config(function($stateProvider,$httpProvider,$urlRouterProvider){
			
			$urlRouterProvider.otherwise('/');

			$stateProvider
			
			.state('shop',{
				url:'/',
				templateUrl:'site/partials/shop-main.html',
				controller:'ShopCtrl as ctrl',
				//TODO #3 resolve products before main page load
				resolve:{
					products:function(productSrv){
						return productSrv.getProducts();
					}
				}
			})

			.state('admin',{
				url:'/admin',
				templateUrl:'site/partials/admin.html',
				controller:'AdminCtrl as ctrl',
				//TODO #2 Resolve Products before admin page load
				resolve:{
					products:function(productSrv){
						return productSrv.getProducts();
					}
				}
			})

			.state('admin.dash',{
				url:'/dashboard',
				templateUrl:'site/partials/admin-dash.html',
				// need to use admin controller
				// controller:'AdminCtrl as ctrl'
			})

			.state('admin.orders',{
				url:'/orders',
				templateUrl:'site/partials/admin-orders.html',
				controller:'AdminCtrl as ctrl'
			})
			.state('admin.order_details',{
				url:'/orders/:orderId',
				templateUrl:'site/partials/admin-order-details.html',
				controller:'OrderCtrl as ctrl'
			})

			.state('admin.add_product',{
				url:'/add_product',
				controller:'ProductCtrl as ctrl',
				templateUrl:'site/partials/admin-add-product.html'
			})

			.state('admin.edit_product',{
				url:'/edit_product/:productId',
				controller:'ProductCtrl as ctrl',
				templateUrl:'site/partials/admin-edit-product.html',
			})

			.state('auth',{
				url:'/auth',
				templateUrl:'site/partials/auth-main.html',
				controller:'AuthCtrl as ctrl',	
			})

			.state('categories',{
				url:'/categories/:categoryName',
				controller: 'CategoryCtrl as ctrl',
				templateUrl: 'site/partials/categories.html',
				resolve:{
					products:function(productSrv){
						return productSrv.getProducts();
					}
				}
			})

			.state('product',{
				url:'/products/:productId',
				controller: 'ProductCtrl as ctrl',
				templateUrl: 'site/partials/product.html',

			})

			.state('checkout',{
				url:'/checkout',
				controller: 'CheckoutCtrl as ctrl',
				templateUrl: 'site/partials/checkout.html',

			})

			.state('confirmation',{
				url:'/confirmation/:orderId',
				controller: 'ConfirmationCtrl as ctrl',
				templateUrl: 'site/partials/confirmation.html',
			});


			$httpProvider.interceptors.push(function(){
		       return {
		           request: function(config) {
		               return config;
		           },
		           response: function(response) {
		               var auth_token = response.headers('authentication');
		               if(localStorage.authToken == undefined && auth_token != null){
		               		localStorage.authToken = auth_token;
		               }
		               return response;
		           }
		       }
		   	});

			
		});

	angular.module('shopApp')
		.run(function($rootScope) {
    		$rootScope.$on('$stateChangeSuccess', function() {
	   			document.body.scrollTop = document.documentElement.scrollTop = 0;
			});
		})

	angular
	    .module('shopApp')
	    .config(function(toastrConfig) {
	      angular.extend(toastrConfig, {
	        positionClass: 'toast-bottom-right'
	    	});
	    });


 
})();

