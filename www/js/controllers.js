angular.module('calorific.controllers', [])

.controller('CalCtrl', function($scope, $stateParams, foodService) {
  	foodService.getFoodList().then(function(foodList){
  		$scope.foodList = foodList;
	});
})

.controller('DashCtrl', function($scope, calService){
	$scope.calories = calService;
});
