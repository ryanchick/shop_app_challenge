(function(){
	angular
		.module('shopApp')
		.controller('ConfirmationCtrl',ConfirmationCtrl)

	function ConfirmationCtrl($scope,productSrv){
		var cfrmVm = this;

		//TODO #1 Capture name, email, conirmation #
		// and order list form checkout info
		cfrmVm.customer = customerInfo;
		
	}

})();