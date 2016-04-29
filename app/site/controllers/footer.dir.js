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


  function footerCtrl($scope, $state,$location){
    console.log('footer')
    this.is_admin = false;
    // console.log($state.current.name)
    // console.log($location)
    if($state.current.name.search('admin') != -1){
      this.is_admin=true;
    }

    $scope.$watch($state.current.name,function(){
      // console.log($state.current.name)
      if($state.current.name.search('admin') != -1){
        this.is_admin=true;
      }
    })
    console.log(this.is_admin)
  }
})();
