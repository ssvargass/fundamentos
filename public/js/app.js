(function () {
  var app = angular.module('fundamentosController', []);

  app.controller('TasasEquivalentesController', ['$scope', '$interval', '$http',
    function ($scope, $interval, $http) {
      
    $scope.n = [
      {
        value : 12,
        label : 'anual', 
      },
      {
        value : 6,
        label : 'semestral',
      },
      {
        value : 3,
        label : 'trimestral',
      },
      {
        value : 2,
        label : 'bimestral',
      },
      {
        value : 1,
        label : 'mensual',
      },
    ];


  }]);

})();
