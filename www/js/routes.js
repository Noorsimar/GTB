angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    
.state('menu.home', {
    url: '/home',
    cache:false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })
  .state('menu.normalbooking', {
    url: '/normalbooking',
    cache:false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/normalbooking.html',
        controller: 'normalbookingCtrl'
      }
    }
  })

.state('menu.stationbooking', {
    url: '/stationbooking',
    cache:false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/stationbooking.html',
        controller: 'stationbookingCtrl'
      }
    }
  })


  .state('menu.settings', {
    url: '/settings',
    cache:false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('menu.wallet', {
    url: '/wallet',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/wallet.html',
        controller: 'walletCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true,
    controller: 'sidemenuCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    cache: false,
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

$urlRouterProvider.otherwise('/')

  

});