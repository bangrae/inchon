angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicHistory) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.loginBefore = true;
  $scope.loginAfter = false;

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

    var id = $scope.loginData.username;
    var pw = $scope.loginData.password;

    if (id=='user' && pw == '1111') {
      $scope.loginBefore = false;
      $scope.loginAfter = true;

      alert('login success ' + id);
      window.localStorage.setItem("id", id);
    } else {
      $scope.loginData = {};
    }
    console.log(id);


    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.doLogout = function() {
    console.log('Doing logout');

    $scope.loginData = {};
    $scope.loginBefore = true;
    $scope.loginAfter = false;
  };

  $scope.doBack = function() {
    $ionicHistory.goBack();
  }
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

.controller('loginListCtrl', function($scope, $http) {
  $scope.items = new Array();
  $http.get('http://192.168.10.113/inchon/login.php')
    .success(function(data, status) {
      var itemList = data;
      for (var i = 0; i < itemList.length; i++) {
        $scope.items.push(itemList[i]);
      }
      console.log("ok " + status);
    })
    .error(function(data, status) {
      console.log("Error " + status);
    });
})

.controller('loginDetailCtrl', function($scope, $stateParams, $http) {
  console.log("loginDetailCtrl in");
  console.log($stateParams.loginInfo);
  
  var loginJson = $stateParams.loginInfo;
  console.log("json=" + loginJson);

  $scope.jsonItem = {};

  $http.post("http://192.168.10.113/inchon/loginDetail.php", loginJson)
    .then(function (res){
            var itemList = res.data;
            if (itemList.length > 0) {
              $scope.jsonItem = itemList[0];
            }        
    });

    $scope.doLoginSave = function() {
      var jdata = $scope.jsonItem;

      $http.post("http://192.168.10.113/inchon/loginDetailWrite.php", jdata)
        .then(function (res) {
          var itemList = res.data;

          console.log(res.data);
          console.log(itemList[0]);
          
          if (itemList.length > 0) {
            console.log(itemList[0]);
          }
        });
    }
})

.controller('iomCtrl', function($scope, $state){

  $scope.doIomPost = function() {

    if ($scope.loginData.username == '' || $scope.loginData.username == null) {
      $scope.login();
      return;
    } else {
      console.log('go Iom process');
    }
    var iomObj = $scope.iomData;

    console.log('Iom Next ');
    //console.log('Doing Iom Post Ymd(' + iomObj.year + ') cha(' + iomObj.cha + ')');

    //$scope.iomData.year = '';

    // app.board 페이지 load
    //$state.go('app.board');
    
  }
})

;
