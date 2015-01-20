'use strict';

/**
 * @ngdoc function
 * @name jstestApp.service:BasketService
 * @description
 * # BasketService
 * Service of the jstestApp
 */
angular.module('jstestApp')
	.service('BasketService', ['$cookieStore', function ($cookieStore) {

		var basket = {};

		//get cookie
		if( $cookieStore.get('fooditBasket') )
		{
			basket = $cookieStore.get('fooditBasket');
		}

		//get simple counts
		this.getNumberById = function(id)
	    {
	    	return basket[id].quantity || 0;
	    };

	    this.getTotalNumber = function()
	    {
	    	var total = 0;
      		for(var id in basket) {
        		total += this.getNumberById(id);
      		}
      		return total;
	    };

	    this.getPriceById =function(id)
	    {
      		return this.getNumberById(id) * parseFloat(basket[id].price, undefined);
    	};

	    this.getTotalPrice = function()
	    {
	    	var totalCost = 0;
      		for(var id in basket) {
        		totalCost += this.getPriceById(id);
      		}
      		return totalCost;
	    };

	    //getBasket
	    this.getBasketByType = function()
	    {
	    	var basketByType = {};
      		for(var id in basket) {
      			var type = basket[id].type;
      			if( basketByType[type] )
      			{
      				basketByType[type].meals[id] = basket[id];
      				basketByType[type].total += basket[id].quantity;
      			}
      			else
      			{
      				basketByType[type] = {};
      				basketByType[type].meals = {};
      				basketByType[type].meals[id] = basket[id];
      				basketByType[type].total = basket[id].quantity;
      			}
      		}
      		return basketByType;
	    };

	    //modify basket
	    this.removeItem = function( meal )
	    {
	    	if( basket[meal.id] )
	    	{
	    		basket[meal.id].quantity = basket[meal.id].quantity - 1;
	    		if( basket[meal.id].quantity === 0 )
	    		{
	    			delete basket[meal.id];
	    		}
	    		this.saveCookie();
	    	}
	    	else
	    	{
	    		console.log('item doesn\'t exist');
	    	}
	    };

	    this.addItem = function( meal )
	    {
	    	if( basket[meal.id] )
	    	{
	    		basket[meal.id].quantity = basket[meal.id].quantity + 1;
	    	}
	    	else
	    	{
	    		basket[meal.id] = {
		    		name: meal.name,
		        	price: meal.price,
		        	quantity: 1,
		        	type: 'other',
		        	tags: meal.tags,
		        	id: meal.id
	    		};
	    		meal.tags.forEach( function(tag) {
	        		if( tag.substring(0, 7) === '#course' )
	        		{
	        			basket[meal.id].type = tag.substring(tag.indexOf(':') + 1);
	        		}
	        	});
	    	}
	    	this.saveCookie();
	    };

	    this.saveCookie = function()
	    {
	    	$cookieStore.put('fooditBasket',basket);
			var favoriteCookie = $cookieStore.get('fooditBasket');
			console.log(favoriteCookie);
	    };

	    return this;

	}]);