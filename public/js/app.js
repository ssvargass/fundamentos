(function () {
  var app = angular.module('fundamentosController', []);

  app.controller('TasasEquivalentesController', ['$scope', '$interval', '$http',
    function ($scope, $interval, $http) {
      
    $scope.n = [
      {
        value : 12,
        liquidada : 'mes',

      },
      {
        value : 6,
        liquidada : 'bimestre',

      },
      {
        value : 4,
        liquidada : 'trimestre',
      },
      {
        value : 2,
        liquidada : 'semestre'
      },
    ];

    
    $scope.Final = $scope.capital * Math.pow(( 1 + $scope.ieb), $scope.n);


  }]);

})();
