angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('aCtrl', function($scope, $http){
    $scope.items = new Array();
    $http.get('http://192.168.10.113/inchon/a.php')
        .success(function(data, status) {
            var itemList = data;
            for (var i = 0; i < itemList.length; i++) {
                $scope.items.push( itemList[i] );
            }
            console.log("ok" + status);
            console.log(status);
        })
        .error(function(data, status) {
            console.log("Error - getDataList " + status);
            console.log(status);
            //console.log(JSON.stringify(err));
        });
})

.controller('iomCtrl', function($scope, Post){
  console.log('here');
  
  $scope.posts = Post.query();

  $scope.iomYear = {};
  $scope.iomPost = function() {
    var post = new Post($scope.iomYear);
    conole.log(post);
  }
})
;
