angular.module('calorific.controllers', [])

.controller('LookupCtrl', function($scope, $stateParams, $ionicPopup, $filter, foodService, calService) {
  	foodService.getFoodList().success(function(foodList){
  		$scope.foodList = foodList;
	});

	$scope.showConfirm = function(food) {
		var curDate = new Date;
		curDate = $filter('date')(curDate, "dd/MM/yyyy");
   		var confirmPopup = $ionicPopup.confirm({
     		title: 'Add Calories?',
     		template: 'Add ' + food.calories + ' to today\'s food?'
   		});

   		confirmPopup.then(function(res) {
	 		if(res) {
       			calService.addDCals(food.calories);
       			console.log('added ' + food.calories);
       			if(window.localStorage[curDate])
       			{
	       			window.localStorage[curDate] += JSON.stringify(food)+ ',';
	       			console.log('added ' + JSON.stringify(food) + ' to localStorage');       				
       			}
       			else{
       				window.localStorage[curDate] = JSON.stringify(food)+ ',';
       				console.log('New ' + JSON.stringify(food) + ' to localStorage');
       			}
	     	} 
	     	else {
	       		console.log('Cancelled');
	     	}
   		});
	};

})

//the dashboard controller
//this will handle the Daily goal, daily calorie consumption, and the goal
//A list of food consumed today will also be held
.controller('DashCtrl', function($scope, calService, $ionicPopup,$filter){
	$scope.calories = calService.getDCals();
	$scope.goal = calService.getGoal();
	$scope.burnt = calService.getBurnt();
	$scope.curDate = new Date;
	$scope.curDate = $filter('date')($scope.curDate, "dd/MM/yyyy");

	//this will provide the meals with permanent storage
	var str = window.localStorage[$scope.curDate];

	if(str){
		str = str.substring(0, str.length - 1);
		str = '[' + str + ']';
		console.log(' localStor === '+str);
		try{
			$scope.todaysList = JSON.parse(str || []);
		}
		catch(err)
		{
			$scope.todaysList = "";
		}
	}
	else{
		$scope.todaysList = [];
	
	}

	$scope.clearStorage = function(){
		window.localStorage[$scope.curDate] = "";
		console.log(' localStor cleared? === '+str);
		location.reload();
	};

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
			            return $scope.data.newGoal;
          			}
	        	}	
	      	}
	    ]
	});
	myPopup.then(function(result) {
  	calService.setGoal(parseInt(result));
  });
}
	$scope.addBurnt = function() {
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
			            //don't allow the user to close unless he enters wifi password
			            e.preventDefault();
			        } 
		          	else {
			            return $scope.data.burnt;
          			}
	        	}	
	      	}
	    ]
	});
	myPopup.then(function(result) {
  	calService.addBurnt(parseInt(result));
  });
};
})
.controller('HistoryCtrl', function($scope, calService, $ionicPopup, $filter){
	
})

;
