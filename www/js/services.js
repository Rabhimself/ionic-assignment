angular.module('calorific.services', [])

.factory('calService', function(){
	
	var dailyCals = 0;
	var goal = { data : 0};

	return{
		getDCals: function(){
			console.log("getDCals called");
			return dailyCals;

		},
		addDCals: function(data){
			dailyCals = dailyCals + parseInt(data);
			console.log("addDCals called");
		},
		setGoal: function(data){
			goal.data = parseInt(data);
			console.log("setGoal called");
		},
		getGoal: function(){
			console.log("getGoal called");
			return goal;
		},
		addBurnt: function(data){
			console.log("addBurnt called");
		},
		getBurnt: function(){
			console.log("getBurnt called");
			return burnt;
		}
	};

})
    
.factory('todayService', function(){

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

