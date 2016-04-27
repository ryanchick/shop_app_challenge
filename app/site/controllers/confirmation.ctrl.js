(function(){
	angular
		.module('shopApp')
		.controller('ConfirmationCtrl',ConfirmationCtrl)

	function ConfirmationCtrl($scope,$stateParams,productSrv){
		var cfrmVm = this;

		//TODO #1 Capture name, email, conirmation #
		// and order list form checkout info
		
		cfrmVm.orderId = $stateParams.orderId
		console.log(cfrmVm.orderId)
		getOrder();
		// cfrmVm.order = productSrv.orders[0]
		console.log(cfrmVm.order)

		function getOrder(){
			for(var i = 0;i<productSrv.orders.length;i++){
				if($stateParams.orderId == productSrv.orders[i].id)
				{
					cfrmVm.order = productSrv.orders[i];
				}
			}
		}
		
	}

})();