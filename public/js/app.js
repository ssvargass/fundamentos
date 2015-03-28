(function () {
  var app = angular.module('fundamentosController', ['ng-currency']);

  app.controller('TasasEquivalentesController', ['$scope', '$interval', '$http',
    function ($scope, $interval, $http) {
    // $scope.interes = 0;
    $scope.selected = 0;
    
    $scope.liquidada = "";
    $scope.efectiva = "";
    $scope.nOptions = [
      {
        value : 12,
        liquidada : 'mes',
        efectiva : 'mensual'
      },
      {
        value : 6,
        liquidada : 'bimestre',
        efectiva : 'bimestral'
      },
      {
        value : 4,
        liquidada : 'trimestre',
        efectiva : 'trimestral'
      },
      {
        value : 2,
        liquidada : 'semestre',
        efectiva : 'semestral'
      },
    ];

    $scope.n = $scope.nOptions[0];

    $scope.getN = function(index){
      $scope.n = $scope.nOptions[index];
      $scope.selected = index;
      $scope.getIem();
    } 

    $scope.getIem = function(){
      $scope.iem = $scope.interes / $scope.n.value;
      $scope.liquidada = "liquidada " +$scope.n.liquidada+ " vencido";
      $scope.efectiva = "Tasa de interés efectiva " +$scope.n.efectiva;
      $scope.printalert = true;
      $scope.getFinal();
    }
    
    $scope.getFinal = function(){
      $scope.Final = $scope.capital * Math.pow(( 1 + $scope.iem/100), $scope.n.value);
    } 



  }]);

})();
