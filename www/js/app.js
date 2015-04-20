angular.module('calorific', ['ionic', 'calorific.controllers', 'calorific.services'])

.run(function($ionicPlatform) 
{
  $ionicPlatform.ready(function() 
  {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) 
    {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) 
    {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) 
{
  $stateProvider

  .state('cal', {
    url: "/cal",
    abstract: true,
    templateUrl: "templates/cal.html"
  })

  .state('cal.dash', {
    url: '/dash',
    views: {
      'cal-dash': {
        templateUrl: "templates/cal-dash.html",
        controller: 'DashCtrl'
      }
    }
  })

  .state('cal.lookup', {
    url: '/lookup',
    views: {
      'lookup': {
        templateUrl: "templates/lookup.html",
        controller: 'LookupCtrl'
      }
    }
  })

  .state('cal.history', {
    url: "/history",
    views: {
      'history': {
        templateUrl: "templates/cal-history.html",
        controller: 'HistoryCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('/cal/dash');
});