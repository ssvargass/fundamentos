(function () {
  var app = angular.module('fundamentosController', ['ng-currency']);

  app.controller('TasasEquivalentesController', ['$scope', '$filter',
    function ($scope, $filter) {
    $scope.selected = 0;
    $scope.sselected = 0;
    $scope.rows = [];
    $scope.srows = [];
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
    $scope.sn = $scope.nOptions[0];

    $scope.getN = function(index){
      $scope.n = $scope.nOptions[index];
      $scope.selected = index;
      $scope.getIem();
    } 

    $scope.getNs = function(index){
      $scope.sn = $scope.nOptions[index];
      $scope.sselected = index;
      $scope.getInteres();
    } 

    $scope.getIem = function(){
      $scope.iem = $scope.interes / $scope.n.value;
      $scope.liquidada = "Tasa de interes Nominal de " + $scope.interes +"% - liquidada " +$scope.n.liquidada+ " vencido";
      $scope.efectiva = $scope.iem + "% - Tasa de interés efectiva " +$scope.n.efectiva;
      if($scope.interes != undefined) $scope.printalert = true;
      $scope.getFinal();
      $scope.getInteres();
      $scope.getIea();
    }

    $scope.getIea = function(){
      $scope.iea = Math.pow(1 + ($scope.interes/100) / $scope.n.value , $scope.n.value) - 1;
      $scope.iea *= 100;
    }
    
    $scope.getFinal = function(){
      $scope.Final = $scope.getFinalN($scope.n.value, $scope.capital, $scope.iem);
      $scope.rows = [];
      $scope.rows = $scope.getTable($scope.n.value, $scope.capital, $scope.iem);
      $scope.getInteres();
    } 

    $scope.getInteres = function(){
      $scope.sinteres = (Math.pow(1 + ($scope.interes/100) / $scope.n.value , $scope.n.value/$scope.sn.value) - 1) * $scope.sn.value;
      $scope.sinteres *= 100;
      $scope.siem = $scope.sinteres / $scope.sn.value;
      $scope.sFinal = $scope.getFinalN($scope.sn.value, $scope.capital, $scope.siem);
      $scope.srows = [];
      $scope.srows = $scope.getTable($scope.sn.value, $scope.capital, $scope.siem);
      var inter = $filter('number')($scope.sinteres,2);
      var siem = $filter('number')($scope.siem, 2);
      $scope.sliquidada = "Tasa de interes Nominal de " + inter +"% - liquidada " +$scope.sn.liquidada+ " vencido";
      $scope.sefectiva = siem + "% - Tasa de interés efectiva " +$scope.sn.efectiva;
    }


    $scope.getTable = function(n,c,iem){
      var rows = [];
      for(var i = 0; i <= n; i++){
        var interes = 0;
        var deposito = '';
        var futuro = $scope.getFinalN(i, c, iem);
        if(i > 0){
          interes = futuro * iem/100;
        } else {
          deposito = $filter('currency')(c);
        }
        
        var row = {
          deposito : deposito,
          n : i,
          interes : interes,
          futuro : futuro,
        }
        rows.push(row);
      }
      return rows
    }

    $scope.getFinalN = function(n,c,iem){
      var n_final = c * Math.pow(( 1 + iem/100), n);
      return n_final;
    } 

  }]);

  app.directive('numberFormat', ['$filter', '$parse', function ($filter, $parse) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelController) {
            var decimals = $parse(attrs.decimals)(scope);

            ngModelController.$parsers.push(function (data) {
                //convert data from view format to model format
                return $filter('number')(data, decimals); //converted
            });

            ngModelController.$formatters.push(function (data) {
                //convert data from model format to view format
                return $filter('number')(data, decimals); //converted
            });

            element.bind('focus', function () {
                element.val(ngModelController.$modelValue);
            });

            element.bind('blur', function () {
                element.val(ngModelController.$viewValue);
            });
        }
    }
  }]);
})();
