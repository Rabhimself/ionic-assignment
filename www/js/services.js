angular.module('calorific.services', [])

//the main service that handles the caloric values
.factory('calService', function(){
	//These are saved as objects so that the data is passed by reference
	//when being returned to controllers
	
	//calories consumed today
	var dailyCals = { data : 0}
	//todays goal (limit) for calorie consumption
	var goal = { data : 0 };
	//tracks how many calories have been burnt via exercise
	var burnt = { data : 0 };

	

	return{
		//returns the dailyCals object
		getDCals: function(){
			
			if(!window.localStorage['dailyCals'])
				window.localStorage['dailyCals'] = 0;
			console.log("About to parse and store");
			console.log(window.localStorage['dailyCals']);
			dailyCals.data = parseInt(window.localStorage['dailyCals']);
			console.log("getDCals called - returning: " +dailyCals.data);
			return dailyCals;
		},
		//adds calories to the daily tracker
		addDCals: function(data){
			dailyCals.data += parseInt(data);
			window.localStorage['dailyCals'] = dailyCals.data;
			console.log("addDCals called- dailyCals value is now " +JSON.stringify(dailyCals.data));
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
})

.factory('historyService', function($filter)
{
	var historySet = [];
	var curDate = new Date;
	var curDate = $filter('date')(curDate, "dd/MM/yyyy");
	var curSet = {};

	if(window.localStorage['historySet'])
		historySet = JSON.parse(window.localStorage['historySet'] || '[]');
		

	return{
		addToHistorySet: function(food)//adds a food to the current day's set
		{
			var found = false;
			historySet.forEach(function(set) 
			{
				if(set.date == curDate)
				{
					found = true;
					set.foods.push(food);
				}
			});
			if(!found)
			{
				var newSet = {};
				newSet.date = curDate;
				newSet.foods = [];
				newSet.foods.push(food);
				historySet.push(newSet);
			}
			window.localStorage['historySet'] = JSON.stringify(historySet);

		},
		getHistorySet: function()
		{
			return historySet;
		},
		getCurSet: function()
		{
			historySet.forEach(function(set) 
			{
				if(set.date == curDate)
				{
					console.log("returning");
					console.log(set);
					curSet = set;
					console.log(curSet);
					
				}
			});
			return curSet;
		}
	}
})

;

