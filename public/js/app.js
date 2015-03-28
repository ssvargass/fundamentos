(function () {
  var app = angular.module('fundamentosController', ['ng-currency']);

  app.controller('TasasEquivalentesController', ['$scope', '$filter',
    function ($scope, $filter) {
    // $scope.interes = 0;
    $scope.selected = 0;
    $scope.rows = [];
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
      $scope.liquidada = "Tasa de interes Nominal de " + $scope.interes +"% - liquidada " +$scope.n.liquidada+ " vencido";
      $scope.efectiva = $scope.iem +"% - Tasa de interés efectiva " +$scope.n.efectiva;
      if($scope.interes != undefined) $scope.printalert = true;
      $scope.getFinal();
    }
    
    $scope.getFinal = function(){
      $scope.Final = $scope.getFinalN($scope.n.value, $scope.capital, $scope.iem);
      $scope.getTable();
    } 

    $scope.getTable = function(){
      $scope.rows = [];
      for(var i = 0; i <= $scope.n.value; i++){
        var interes = 0;
        var deposito = '';
        var futuro = $scope.getFinalN(i, $scope.capital, $scope.iem);
        if(i > 0){
          interes = futuro * $scope.iem/100;
        } else {
          deposito = $filter('currency')($scope.capital);
        }
        
        var row = {
          deposito : deposito,
          n : i,
          interes : interes,
          futuro : futuro,
        }
        $scope.rows.push(row);
      }
    }

    $scope.getFinalN = function(n,c,iem){
      var n_final = c * Math.pow(( 1 + iem/100), n);
      return n_final;
    } 

  }]);

})();
