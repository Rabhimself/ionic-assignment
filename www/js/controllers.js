angular.module('calorific.controllers', [])

.controller('LookupCtrl', function($scope, $stateParams, $ionicPopup, foodService, calService) {
  	foodService.getFoodList().success(function(foodList){
  		$scope.foodList = foodList;
	});

	$scope.showConfirm = function(caloriesAdded) {
   		var confirmPopup = $ionicPopup.confirm({
     		title: 'Add Calories?',
     		template: 'Are you sure you want to add ' + caloriesAdded + ' ?'
   		});

   		confirmPopup.then(function(res) {
	 		if(res) {
	       		console.log('add ' + caloriesAdded);
       			calService.addDCals(caloriesAdded);
	     	} 
	     	else {
	       		console.log('You are not sure');
	     	}
   		});
	};

})

.controller('DashCtrl', function($scope, calService, $ionicPopup){
	$scope.calories = calService.getDCals();
	$scope.goal = calService.getGoal();
	$scope.burnt = calService.getBurnt();

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
			            //don't allow the user to close unless he enters wifi password
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

.controller('SingleCtrl', function($scope, $stateParams, foodService){
	foodService.getFoodList().success(function(foodList){
  		$scope.foodList = foodList;
  		$scope.foodId = stateParams.foodId;
  	})

});
