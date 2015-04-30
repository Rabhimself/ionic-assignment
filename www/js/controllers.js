angular.module('calorific.controllers', [])

//controller that handles the USDA database page. The user can search for and get caloric values for various foods
//as well as add multiple servings of that food to their daily intake
.controller('LookupCtrl', function($scope, $stateParams, $ionicPopup, $filter, foodService, historyService) {
	//gets the database from a json file and saves it to scope
  	foodService.getFoodList().success(function(foodList){
  		$scope.foodList = foodList;
  		$scope.servings = {data : 1};
	});

  	$scope.search = '';

  	//popup that allows the user to add multiple instances of the selected food to the history of what they ate
	$scope.showConfirm = function(food) {
		var curDate = new Date;
		//get the current date
		curDate = $filter('date')(curDate, "dd/MM/yyyy");
   		var myPopup = $ionicPopup.show({
     		title: 'Servings',
     		scope : $scope,
     		subTitle: 'How many servings?',
     		template: '{{servings.data}} servings',
     		buttons: [

     			{ 
     				//the "done" button
			    text: '<i class="button button-icon icon ion-checkmark"></i>',
			    type: 'button-icon',
			    onTap: function() {	
			    	food.servings = $scope.servings.data;
			    	//pass the information to the history service to save it to the main history set
   					historyService.addToHistorySet(food);
	       			}
				  
				},
     			{ 
     				//incrememnts the servings
			    text: '<i class="button button-icon icon ion-plus"></i>',
			    type: 'button-icon',
			    onTap: function() {
			      $scope.servings.data++;
			      event.preventDefault();
			    	}
  				},
  				{ 
  					//decrements the servings
			    text: '<i class="button button-icon icon ion-minus"></i>',
			    type: 'button-icon',
			    onTap: function() {
			      $scope.servings.data--;
			      event.preventDefault();
			    	}
		   		},
     			{ 
     				//cancel button
			    text: '<i class="button button-icon icon ion-close"></i>',
			    type: 'button-icon',
			    onTap: function() {
			      $scope.servings.data = 1;
			    }
			}]			    
   		})
		//reset the servings to 1 for the next time they add something
		myPopup.then(function(){$scope.servings.data=1});;


	}

})
//the dashboard controller
//this will handle the Daily goal, daily calorie consumption, and the goal
//A list of food consumed today will also be held
.controller('DashCtrl', function($scope, $ionicPopup,$filter, historyService){
	$scope.$on("$ionicView.beforeEnter", function(){
		$scope.foodSet = historyService.getCurSet();
		$scope.currentSet = foodSet[0];
	});

	$scope.currentSet = historyService.getCurSet();
	console.log($scope.currentSet)
	$scope.curDate = new Date;
	$scope.curDate = $filter('date')($scope.curDate, "dd/MM/yyyy");
	$scope.foodSet = {};

	//run every time the page is loaded
	//reload the foodset from the history service


	//function to set the goal, uses a popup
	$scope.setGoal = function() {
	$scope.data = {}
	var myPopup = $ionicPopup.show({

	    template: '<input ng-model="data.newGoal">',
	    title: 'What\'s Today\'s Goal?',
	    scope: $scope,
	    buttons: [
	    	{ text: 'Cancel' },
      		{
	        text: '<b>Save</b>',
	        type: 'button-positive',
	        onTap: function(e) {
	          	if (!$scope.data.newGoal) {
		            e.preventDefault();
		        } 
	          	else {
	          		//store the goal that was entered
	          		historyService.addGoal($scope.data.newGoal);
		            return $scope.data.newGoal;
      			}
        	}	
	      	}
	    ]
	});

	}
	//add calories burnt via exercise with a single tap
	$scope.addSpent = function() {
		$scope.data = {}
		var myPopup = $ionicPopup.show({

		    template: '<input ng-model="data.burnt">',
		    title: 'How many calories did you burn?',
		    scope: $scope,
		    buttons: [
		    	{ text: 'Cancel' },
	      		{
		        text: '<b>Save</b>',
		        type: 'button-positive',
		        onTap: function(e) {
		          	if (!$scope.data.burnt) {
			            e.preventDefault();
			        } 
		          	else {
			            historyService.addSpent($scope.data.burnt);
	      			}
	        	}	
		      	}
		    ]
		});
	};
	//allows the user to tap and hold, then change the spent value to a certain value
	//this is to allow them to fix an incorrectly entered value
	$scope.modifySpent = function() {
		$scope.data = {}
		var myPopup = $ionicPopup.show({

		    template: '<input ng-model="data.burnt">',
		    title: 'Modify burnt calories',
		    scope: $scope,
		    buttons: [
		    	{ text: 'Cancel' },
	      		{
		        text: '<b>Save</b>',
		        type: 'button-positive',
		        onTap: function(e) {
		          	if (!$scope.data.burnt) {
			            e.preventDefault();
			        } 
		          	else {
			            historyService.modSpent($scope.data.burnt);
	      			}
	        	}	
		      	}
		    ]
		});
	};
})
//Handles the main data structure that stores all consumed meals
.controller('HistoryCtrl', function($scope, $ionicPopup, $filter, historyService){
	//history set will be the model for all meals consumed
	//it is served by the historyService
	$scope.historySet = historyService.getHistorySet();
	//each set will have a total calories that is made of each meal's calories per serving
	//multiplied by the servings
	$scope.historySet.forEach(function(set)
	{
		set.totalCals = 0;
		set.foods.forEach(function(food)
		{
			set.totalCals += food.calories * food.servings;
		})
	})
	//run every time the page is viewed
	//as more meals are added, the totalcCals variable needs to be updated
	$scope.$on("$ionicView.beforeEnter", function(){
		$scope.historySet[0].totalCals = 0;
		$scope.historySet[0].foods.forEach(function(food)
		{
			$scope.historySet[0].totalCals += food.calories * food.servings;
		})

	}); 
})
//controller that handles the favorites page, which is a list of custom created dishes/meals
//Each dish has a name, serving type/size (slice, bowl, cup) which can be anything, and calories for that serving
.controller('favsCtrl', function($scope, $ionicPopup, favsService, $filter, historyService){
	$scope.favsList = []
	$scope.favsList = favsService.getFavsList();
	console.log($scope.favsList);
	
	$scope.newFavorite = function() {
		$scope.newFav = {};
		var myPopup = $ionicPopup.show({

		    templateUrl: 'templates/newFavPopup.html',
		    title: 'New favorite meal',
		    scope: $scope,
		    buttons: 
		    [
		    	{ text: 'Cancel' },
	      		{
			        text: '<b>Save</b>',
			        type: 'button-positive',
			        onTap: function(e) 
			        {
			        	console.log("asdf");
			          	if (!$scope.newFav.name && !$scope.newFav.calories && !$scope.newFav.measure) 
			          	{
				            e.preventDefault();
				        } 
			          	else 
			          	{
		          			favsService.addToFavsList($scope.newFav);
		      			}

		        	}	
		      	}
		    ]
		});
	};
	//Popup that asks how many servings the user ate
	$scope.showConfirm = function(food) {
	var curDate = new Date;
	$scope.servings={data:1};
	curDate = $filter('date')(curDate, "dd/MM/yyyy");
		var myPopup = $ionicPopup.show({
 		title: 'Servings',
 		scope : $scope,
 		subTitle: 'How many servings?',
 		template: '{{servings.data}} servings',
 		buttons: [

 			{ //The done button, looks like a checkmark
		    text: '<i class="button button-icon icon ion-checkmark"></i>',
		    type: 'button-icon',
		    onTap: function() {
		    	//stores the servings and passes the data to the history service
		    	//data is then stored in localStorage in a stringified array	
		    	food.servings = $scope.servings.data;
					historyService.addToHistorySet(food);
       			}
			  
			},
 			{ //increases servings
		    text: '<i class="button button-icon icon ion-plus"></i>',
		    type: 'button-icon',
		    onTap: function() {
		      $scope.servings.data++;
		      event.preventDefault();
		    	}
				},
				{//decreases servings 
		    text: '<i class="button button-icon icon ion-minus"></i>',
		    type: 'button-icon',
		    onTap: function() {
		      $scope.servings.data--;
		      event.preventDefault();
		    	}
	   		},
 			{ //cancels
		    text: '<i class="button button-icon icon ion-close"></i>',
		    type: 'button-icon',
		    onTap: function() {
		      $scope.servings.data = 1;
		    }
		}]			    
	})
	//reset the servings to 1 for the next time the popup is shown
	myPopup.then(function(){$scope.servings.data=1});
	}
	
});
