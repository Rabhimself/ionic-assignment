angular.module('calorific.services', [])

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


	if(window.localStorage['historySet'])
		historySet = JSON.parse(window.localStorage['historySet'] || '[]');
	else
	{
		historySet[0] = { date: curDate , foods : [], goal : 0, spent : 0, totalCals : 0}
	}

	historySet.forEach(function(set) 
	{
		if(set.date == curDate)
		{
			curSet = set;
		}
	});
	return{
		addToHistorySet: function(food)//adds a food to the current day's set
		{

			var found = false;
			historySet.forEach(function(set) 
			{
				if(set.date == curDate)
				{
					found = true;
					set.foods.unshift(food);
					set.totalCals += parseInt(food.calories*food.servings);
				}
			});
			if(!found)
			{
				var newSet = {};
				newSet.date = curDate;
				newSet.foods = [];
				newSet.foods.unshift(food);
				historySet.unshift(newSet);
			}
			window.localStorage['historySet'] = JSON.stringify(historySet);

		},
		getHistorySet: function()
		{
			return historySet;
		},
		getCurSet: function()
		{
			return curSet;
		},
		addGoal: function(goal)
		{
			historySet[0].goal = parseInt(goal);
			window.localStorage['historySet'] = JSON.stringify(historySet);
		},
		getGoal: function()
		{	
			curSet = historySet[0];
			if(curSet.goal)
			{
				return curSet.goal;
			}
			else
				return "You haven't set a goal yet!";
		},
		addSpent: function(spent)
		{
			curSet.spent += parseInt(spent);
			window.localStorage['historySet'] = JSON.stringify(historySet);
		},
		getSpent: function()
		{
			return curSet.spent;
		},
		modSpent: function(spent)
		{
			curSet.spent = parseInt(spent);
			window.localStorage['historySet'] = JSON.stringify(historySet);
		}

	}
})

;

