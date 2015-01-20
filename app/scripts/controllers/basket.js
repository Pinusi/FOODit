'use strict';

/**
 * @ngdoc function
 * @name jstestApp.controller:BasketCtrl
 * @description
 * # BasketCtrl
 * Controller of the jstestApp
 */
angular.module('jstestApp')
  .controller('BasketCtrl', ['$scope', '$rootScope', 'BasketService', function ($scope, $rootScope, BasketService) {
  	
  	//Variables
  	$scope.basketVisible = false;
  	$scope.restaurant = 'Your Delicious Restaurant';

    //if there is a cookie update immediately
  	$scope.itemsNumber = BasketService.getTotalNumber();
  	$scope.totalCost = BasketService.getTotalPrice();
    $scope.basketByType = BasketService.getBasketByType();

  	//basket functions
  	$rootScope.$on('addItemToBasket',function( event,args ){
  		BasketService.addItem(args.meal);
  		$scope.updateCounts();
  	});

    //update counts
    $scope.updateCounts = function() 
  	{
  		$scope.itemsNumber = BasketService.getTotalNumber();
  		$scope.totalCost = BasketService.getTotalPrice();
  		$scope.basketByType = BasketService.getBasketByType();
  		if( $scope.itemsNumber === 0 )
  		{
  			$scope.hideBasket();
  		}
  	};

    //click functions
    $scope.addItem = function() 
  	{
  		BasketService.addItem( this.meal );
  		$scope.updateCounts();
  	};

  	$scope.removeItem = function() 
  	{
  		BasketService.removeItem( this.meal );
  		$scope.updateCounts();
  	};

  	//hide/show
  	$scope.showBasket = function() {
  		$scope.basketVisible = true;
      $rootScope.$emit('basketShown');
    };

    $scope.hideBasket = function() {
  		$scope.basketVisible = false;
      $rootScope.$emit('basketHidden');
    };

    $rootScope.$on('hideBasket',function(){
    	$scope.hideBasket();
    });

    }
]);