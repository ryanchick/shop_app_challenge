(function(){
  angular
    .module("shopApp")
    .directive("footer", function(){
      return{
        scope:true,
        controller: "footerCtrl",
        controllerAs: "ctrl",
        templateUrl: "/site/partials/footer.html"

      };
});

angular
  .module("shopApp")
  .controller("footerCtrl", footerCtrl);


function footerCtrl($scope, $state){

}

})();
