angular.module('calorific.services', [])

//the main service that handles the caloric values
.factory('calService', function(){
	
	//calories consumed today
	var dailyCals = { data : 0};
	//todays goal (limit) for calorie consumption
	var goal = { data : 0};
	//tracks how many calories have been burnt via exercise
	var burnt = {data : 0};

	return{
		//returns the dailyCals object
		getDCals: function(){
			console.log("getDCals called");
			return dailyCals;
		},
		//adds calories to the daily tracker
		addDCals: function(data){
			dailyCals.data = dailyCals.data + parseInt(data);
			console.log("addDCals called");
		},
		//set the daily goal, a popup passes in the new goal
		setGoal: function(data){
			goal.data = parseInt(data);
			console.log("setGoal called");
		},
		//returns the goal object
		getGoal: function(){
			console.log("getGoal called");
			return goal;
		},
		//adds calories to the exercise tracker, a popup passes in the data
		addBurnt: function(data){
			burnt.data = burnt.data + parseInt(data);
			console.log("addBurnt called");
		},
		//returns the amount of calories burnt today
		getBurnt: function(){
			console.log("getBurnt called");
			return burnt;
		}
	};

})  

//service that returns the USDA database for caloric values for a huge range of foods
//the database is a JSON file stored locally, the $http depenency will be injected
//so that the file can be retrieved
.factory('foodService', function($http){
	var foodList;

	return{
			getFoodList: function(){
				//returns 
	    		return $http.get('js/foods.json').success(function(response){
		          		foodList = response;
		          		return foodList;
	          	});
	        }
	}
});

