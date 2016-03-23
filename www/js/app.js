// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngResource']) 

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('a', {
    url: '/a',
    templateUrl: 'templates/a.html',
    controller: 'aCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html'
      }
    }
  })

  .state('app.startIom', {
    url: '/startIom',
    views: {
      'menuContent': {
        templateUrl: 'templates/iom01.html',
        controller: 'iomCtrl'
      }
    }
  })  
  .state('app.iom02', {
    url: '/iom02',
    views: {
      'menuContent': {
        templateUrl: 'templates/iom02.html',
        controller: 'iomCtrl'
      }
    }
  })    

  .state('app.iom03', {
    url: '/iom03/:sectorCD?sectorNM?secYM',
    views: {
      'menuContent': {
        templateUrl: 'templates/iom03.html',
        controller: 'iomCtrl3'
      }
    }
  })  

  .state('app.iom04', {
    url: '/iom04/:iomYM?custCD',
    views: {
      'menuContent': {
        templateUrl: 'templates/iom04.html',
        controller: 'iomCtrl4'
      }
    }
  })  

  .state('app.board', {
    url: '/board',
    views: {
      'menuContent': {
        templateUrl: 'templates/a.html',
        controller: 'aCtrl'
      }
    }
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.loginList', {
    url: '/loginList',
    views: {
      'menuContent': {
        templateUrl: 'templates/loginList.html',
        controller: 'loginListCtrl'
      }
    }
  })

  .state('app.loginDetail', {
    url: '/loginList/:loginInfo',
    views: {
      'menuContent': {
        templateUrl: 'templates/loginDetail.html',
        controller: 'loginDetailCtrl'
      }
    }
  })

  ;
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})

.factory('Post', function($resource){
  return $resource('/api/post');
})

.factory('Scopes', function($rootScope) {
    var mem = {};
    return {
        store: function(key, value) {
             mem[key] = value;
        },
             get: function(key) {
             return mem[key];
         },
         clear: function(key) {
             mem[key] = null;
        }
    };
})
;
