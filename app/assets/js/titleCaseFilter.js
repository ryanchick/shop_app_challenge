(function(){
	angular
		.module('shopApp')
		.filter('titleCaseFilter',titleCaseFilter)
		
	function titleCaseFilter() {
	   return function(in_str) {
	        return in_str.replace(/\b\w/g, function(chr){
	        	return chr.toUpperCase()
	        });
	    };
	};
})();

// angular.module('insultApp').filter('titleCaseFilter', titleCaseFilter);