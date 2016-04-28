(function(){
  'use strict';

  angular
    .module('shopApp')
    .controller('OrderCtrl',OrderCtrl);

  function OrderCtrl($stateParams,$state,productSrv){
  	var orderVm = this;
  	orderVm.order = productSrv.orders[$stateParams.orderId-1]
  	console.log($stateParams.orderId)
  	console.log(orderVm.order)

  	orderVm.goBack = goBack;

  	function goBack(){
  		$state.go('admin.orders')
  	}


  }
})();