angular.module('calorific.controllers', [])

.controller('LookupCtrl', function($scope, $stateParams, $ionicPopup, $filter, foodService, historyService) {
  	foodService.getFoodList().success(function(foodList){
  		$scope.foodList = foodList;
  		$scope.servings = {data : 1};
	});
  	$scope.search = '';
	$scope.showConfirm = function(food) {
		var curDate = new Date;
		
		curDate = $filter('date')(curDate, "dd/MM/yyyy");
   		var myPopup = $ionicPopup.show({
     		title: 'Servings',
     		scope : $scope,
     		subTitle: 'How many servings?',
     		template: '{{servings.data}} servings',
     		buttons: [

     			{ 
			    text: '<i class="button button-icon icon ion-checkmark"></i>',
			    type: 'button-icon',
			    onTap: function() {	
			    	food.servings = $scope.servings.data;
   					historyService.addToHistorySet(food);
	       			}
				  
				},
     			{ 
			    text: '<i class="button button-icon icon ion-plus"></i>',
			    type: 'button-icon',
			    onTap: function() {
			      $scope.servings.data++;
			      event.preventDefault();
			    	}
  				},
  				{ 
			    text: '<i class="button button-icon icon ion-minus"></i>',
			    type: 'button-icon',
			    onTap: function() {
			      $scope.servings.data--;
			      event.preventDefault();
			    	}
		   		},
     			{ 
			    text: '<i class="button button-icon icon ion-close"></i>',
			    type: 'button-icon',
			    onTap: function() {
			      $scope.servings.data = 1;
			    }			    
  			}]
   		})

		myPopup.then(function(){$scope.servings.data=1});;


	}



})

//the dashboard controller
//this will handle the Daily goal, daily calorie consumption, and the goal
//A list of food consumed today will also be held
.controller('DashCtrl', function($scope, $ionicPopup,$filter, historyService){
	$scope.currentSet = historyService.getCurSet();
	console.log($scope.currentSet)
	$scope.curDate = new Date;
	$scope.curDate = $filter('date')($scope.curDate, "dd/MM/yyyy");
	$scope.foodSet = {};
	$scope.$on("$ionicView.beforeEnter", function(){
		$scope.foodSet = historyService.getCurSet();

	});  

	console.log($scope.foodSet);

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
	          		historyService.addGoal($scope.data.newGoal);
		            return $scope.data.newGoal;
      			}
        	}	
	      	}
	    ]
	});
	myPopup.then(function(result) {
  	$scope.goal = historyService.getGoal();
  });
}
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
.controller('HistoryCtrl', function($scope, $ionicPopup, $filter, historyService){

	$scope.historySet = historyService.getHistorySet();
	$scope.historySet.forEach(function(set)
	{
		set.totalCals = 0;
		set.foods.forEach(function(food)
		{
			set.totalCals += food.calories * food.servings;
		})
	})

	$scope.$on("$ionicView.beforeEnter", function(){
		$scope.historySet[0].totalCals = 0;
		$scope.historySet[0].foods.forEach(function(food)
		{
			$scope.historySet[0].totalCals += food.calories * food.servings;
		})

	}); 
	console.log($scope.historySet);

})

;
