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

	angular
		.module('shopApp')    
		.filter('digits', function () {
            return function (input, width, leadingChar) {
                leadingChar = leadingChar || '0';
                input = input + '';
                return input.length >= width ? input : new Array(width - input.length + 1).join(leadingChar) + input;
            }
        });


})();

// angular.module('insultApp').filter('titleCaseFilter', titleCaseFilter);