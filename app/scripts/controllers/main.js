'use strict';

/**
 * @ngdoc function
 * @name jstestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jstestApp
 */
angular.module('jstestApp')
  .controller('MainCtrl', ['$scope', '$rootScope', 'MenuService', function ($scope, $rootScope, MenuService) {
	
	//Variables
	$scope.restaurant = 'Your Delicious Restaurant';
	$scope.menu = {};
	$scope.charLimit = 120;
	$scope.basketVisible = false;

	//Get Data
    MenuService.get('/data/menu.json').success(function(data) {
	  	$scope.menu = data;

	  	//Filter for charlength
	  	for (var i = 0; i < $scope.menu.meals.length; i++) {
	  		if( $scope.menu.meals[i].description.length > $scope.charLimit ){
	  			$scope.menu.meals[i].charLimit = $scope.charLimit;
	  		}
	  	}
	});

    //Function for showmore in description
	$scope.showMore = function(mealchar) 
	{
	    mealchar.charLimit = 9999;
	};

	//broadcast to basket events
	$scope.addItem = function() 
	{
		$rootScope.$emit('addItemToBasket',{ meal: this.meal });
	};

	$scope.broadcastHideBasket = function()
	{
		$rootScope.$emit('hideBasket');
	};

	/*Potentially this one can go on the whole body not on here so it doesn't go back to top*/
	$rootScope.$on('basketHidden',function(){
  		$scope.basketVisible = false;
  	});

  	$rootScope.$on('basketShown',function(){
  		$scope.basketVisible = true;
  	});

  }
]);
