angular.module('calorific.controllers', [])

.controller('CalCtrl', function($scope, $stateParams, foodService) {
  	foodService.getFoodList().success(function(foodList){
  		$scope.foodList = foodList;
	});
})

.controller('DashCtrl', function($scope, calService){
	$scope.calories = calService.getDCals();
})

.controller('SingleCtrl', function($scope, $stateParams, foodService){
	foodService.getFoodList().success(function(foodList){
  		$scope.foodList = foodList;
  	})
  	console.log("BOOOOOBS");
  });
