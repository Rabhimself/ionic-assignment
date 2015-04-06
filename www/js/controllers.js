angular.module('calorific.controllers', [])

.controller('LookupCtrl', function($scope, $stateParams, $ionicPopup, foodService, calService) {
  	foodService.getFoodList().success(function(foodList){
  		$scope.foodList = foodList;
	});

	$scope.showConfirm = function(food) {
   		var confirmPopup = $ionicPopup.confirm({
     		title: 'Add Calories?',
     		template: 'Add ' + food.calories + ' ?'
   		});

   		confirmPopup.then(function(res) {
	 		if(res) {
       			calService.addDCals(food.calories);
       			console.log('added ' + food.calories);
       			if(window.localStorage['todaysMeals'])
       			{
	       			window.localStorage['todaysMeals'] += JSON.stringify(food)+ ',';
	       			console.log('added ' + JSON.stringify(food) + ' to localStorage');       				
       			}
       			else{
       				window.localStorage['todaysMeals'] = JSON.stringify(food)+ ',';
       			}
	     	} 
	     	else {
	       		console.log('Cancelled');
	     	}
   		});
	};

})
//{"id":"2","name":"Acerola (west indian cherry) raw","weight":"98","measure":"1.0 cup","calories":"31"}

//the dashboard controller
//this will handle the Daily goal, daily calorie consumption, and the goal
//A list of food consumed today will also be held
.controller('DashCtrl', function($scope, calService, $ionicPopup){
	$scope.calories = calService.getDCals();
	$scope.goal = calService.getGoal();
	$scope.burnt = calService.getBurnt();
	$scope.curDate = new Date;
	var str = window.localStorage['todaysMeals'];
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
		window.localStorage['todaysMeals'] = "";
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
};

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

//currently unused, keep for later just in case
.controller('SingleCtrl', function($scope, $stateParams, foodService){
	foodService.getFoodList().success(function(foodList){
  		$scope.foodList = foodList;
  		$scope.foodId = stateParams.foodId;
  	})

});
