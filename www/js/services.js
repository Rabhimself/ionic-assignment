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

//Service that handles the food history for the app, everything the user has entered as eaten
//it also tracks the goal and the amount of calories burnt each day
//the history set is an array of objects(sets), each set has a date, goal, spent, and foods array
.factory('historyService', function($filter)
{
	var historySet = [];
	var curDate = new Date();
	curDate = $filter('date')(curDate, "dd/MM/yyyy");
	var curSet = {};

	//check to see if there is a history set in local storage
	if(window.localStorage['historySet'])
		historySet = JSON.parse(window.localStorage['historySet'] || '[]');
	else
	{
		//if not, create a new one at position 0
		historySet[0] = { date: curDate , foods : [], goal : 0, spent : 0, totalCals : 0};
		//and store it;
		window.localStorage['historySet']=historySet;		
	}
	//curSet will trach which set is the current one in the historySet
	//assume it is in position 0, every time a new set is added, use unshift to push it to position 0
	curSet = historySet[0];

	return{
		addToHistorySet: function(food)//adds a food to the current day's set
		{
			//update the date, otherwise a user can add a new food at a later date without
			//reinitializing the app, the old date will still be stored and the app will operate
			//as if it isnt a new day
			curDate = new Date;
			curDate = $filter('date')(curDate, "dd/MM/yyyy");

			if(historySet[0].date == curDate)
			{
				console.log("dates match");
				historySet[0].foods.unshift(food);
				historySet[0].totalCals += parseInt(food.calories*food.servings);
			}
			else//if the current date does not match the one for the newest set
				//create a new one
			{
				var newSet = {};
				newSet.date = curDate;
				newSet.foods = [];
				newSet.foods.unshift(food);
				historySet.unshift(newSet);
			}
			//lastly, update the local storage string
			window.localStorage['historySet'] = JSON.stringify(historySet);
		},
		getHistorySet: function()
		{
			return historySet;
		},
		getCurSet: function()
		{	
			//gets the current date, checks to the see if the last history set to be added is today's
			curDate = new Date;
			curDate = $filter('date')(curDate, "dd/MM/yyyy");

			if(historySet[0].date == curDate)
			{
				curSet = historySet[0];
			}
			else//if the most recent set is not the current day's set, create a new one and push it to the beginning of the array
			{
				var newSet = {};
				newSet.date = curDate;
				newSet.spent = 0;
				newSet.foods = [];
				historySet.unshift(newSet);				
			}			
			return curSet;
		},
		//adds a goal to the current set
		addGoal: function(goal)
		{	

			curDate = new Date;
			curDate = $filter('date')(curDate, "dd/MM/yyyy");

			if(historySet[0].date == curDate)
			{
				//adds a goal to the current set
				historySet[0].goal = parseInt(goal);				
			}
			else
			{
				var newSet = {};
				newSet.date = curDate;
				newSet.spent = 0;
				newSet.foods = [];
				historySet.unshift(newSet);
				//adds a goal to the current set
				historySet[0].goal = parseInt(goal);					
			}
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
			this.getCurSet();
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
.factory('favsService', function(){
	var favsList = [];

	if(window.localStorage['favsList'])
		favsList = JSON.parse(window.localStorage['favsList'] || '[]');
	else	
		favsList = [];

	return{
		getFavsList : function(){
			return favsList;
		},
		addToFavsList : function(newFav){
			var fav = newFav;
			favsList.push(fav);
			window.localStorage['favsList'] = JSON.stringify(favsList);
		}
	}
})
;

