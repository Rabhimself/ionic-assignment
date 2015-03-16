angular.module('calorific.services', [])

.factory('calService', function() {
	
	var dailyCals = 2000;

	return dailyCals;

})
    
.factory('foodService', function($http){
	var foodList;

	return{
			getFoodList: function(){
	    		return $http.get('js/foods.json').then(function(response){
		          		foodList = response;
		          		return foodList;
	          	});
	        }
	}
});

