(function(){
  'use strict';

  angular
    .module('shopApp')
    .controller('AdminCtrl',AdminCtrl);

  function AdminCtrl($scope,$state,productSrv,toastr){
    var adminVm = this;
    adminVm.productSrv = productSrv;
    adminVm.is_products = false;
    adminVm.is_orders = false;
    adminVm.totalRev = 0;


    //check if logged in

    if(localStorage.authToken == undefined || localStorage.authToken == null){
      $state.go('auth');
    }

    adminVm.products = productSrv.products;
    if(adminVm.products.length > 0 ){
      adminVm.is_products = true;
    }

    adminVm.orders = productSrv.orders;
    if(adminVm.orders.length > 0 ){
      adminVm.is_orders = true;
    }
    console.log(adminVm.orders)
    calcRev();

    //watch for updates to products object
    $scope.$watch(function(){
        return productSrv.products;
    }, function (newValue) {
      if(productSrv.products.length > 0){
          adminVm.products = productSrv.products;
          adminVm.is_products = true;
      }
    });

    $scope.$watch(function(){
        return productSrv.orders;
    }, function (newValue) {
      if(productSrv.orders.length > 0){
          adminVm.orders = productSrv.orders;
          adminVm.is_orders = true;
      }
    });

    //public functions
    adminVm.editProduct = editProduct;
    adminVm.logout = logout;
    adminVm.reloadProducts = reloadProducts;

    function reloadProducts(){
      productSrv.deleteAllProducts()
      .then(function(){
        productSrv.loadProducts();
      })
    }

    function editProduct(product){
      $state.go('admin.edit_product',{productId:product.id});
    }

    function logout(){
      localStorage.removeItem('authToken');
      toastr.success('Logged out succesfully.')
      $state.go('auth');
    }

    function calcRev(){
      for(var order in adminVm.orders){
        adminVm.totalRev += adminVm.orders[order].final_total;
      }
    }

  };
})();
