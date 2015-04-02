angular.module('calorific.services', [])

.factory('calService', function(){
	
	var dailyCals = 0;

	return{
		getDCals: function(){
			return dailyCals;
		},
		addDCals: function(data){
			dailyCals += data;
		}
	} 

})
    
.factory('foodService', function($http){
	var foodList;

	return{
			getFoodList: function(){
	    		return $http.get('js/foods.json').success(function(response){
		          		foodList = response;
		          		return foodList;
	          	});
	        }
	}
});

