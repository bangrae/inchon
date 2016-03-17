angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicHistory) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.WebUrl = 'http://localhost:8080/inchon/';

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
  };

  $scope.leadingZeros = function(n, digits) {
  var zero = '';
  n = n.toString();

  if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++)
      zero += '0';
  }
  return zero + n;
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
    $http.get($scope.WebUrl + 'inchon/a.php')
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

.controller('loginListCtrl', function(Scopes, $scope, $http) {
  Scopes.store('loginListCtrl', $scope);
  
  $scope.items = new Array();
  $scope.loadLoginInfo = function() {
    $scope.items = new Array();
    $http.get($scope.WebUrl + 'login.php')
      .success(function(data, status) {
        var itemList = data;
        for (var i = 0; i < itemList.length; i++) {
          $scope.items.push(itemList[i]);
        }
      })
      .error(function(data, status) {
        console.log("Error " + status);
      });
    }
})

.controller('loginDetailCtrl', function(Scopes, $scope, $http, $state) {
  
  var loginJson = $stateParams.loginInfo;

  $scope.jsonItem = {};

  $http.post($scope.WebUrl + "loginDetail.php", loginJson)
    .then(function (res){
            var itemList = res.data;
            console.log(res.data);
            if (itemList.length > 0) {
              $scope.jsonItem = itemList[0];
            }        
    });

    $scope.doLoginSave = function() {
      var jdata = $scope.jsonItem;

      $http.post($scope.WebUrl + "loginDetailWrite.php", jdata)
        .then(function (res) {
          var son = res.data;

          console.log(res.data);

          if (son.result == 0) {
            alert(son.mesg);
          }
          else {
            alert(son.mesg);
          }

          // $state.go('app.loginList');  // 갱신없이 페이지 로딩
          $state.go('app.loginList', null, {'reload':true});  // 페이지 리로딩
          Scopes.get('loginListCtrl').loadLoginInfo();        // loginListCtrl의 함수를 call
          Scopes.clear('loginListCtrl');
        });
    };
})

.controller('iomCtrl', function($scope, $state, $http){
  // 선택된 항목들 정보
  $scope.selectItem = {};

  // item (년, 월, 차수 선택 아이템 리스트)
  $scope.item = {
    year: [
      {id: '1', name: '2015'},
      {id: '2', name: '2016'},
      {id: '3', name: '2017'}
    ],
  };

  // 선택된 연도 혹은 최초 설정 연도
  $scope.selectItem["year"] = {id: '2', name: '2016'};
  var month = [];
  // 12월 까지의 select를 만들기 위하여
  for (var i = 12 - 1; i >= 0; i--) {
    m = {id: i+1, name:$scope.leadingZeros(i+1,2)};
    month[i] = m;
  };

  $scope.item["month"] = month;
  var d = new Date();
  // 현재달을 선택 하기 위하여
  $scope.selectItem["month"] = {id:d.getMonth()+1, name:$scope.leadingZeros(d.getMonth()+1, 2)};

  //검침 차수
  $scope.item["order"] =
    [
    {id: '1', name:'1차'},
    {id: '2', name:'2차'},
    {id: '3', name:'3차'}
    ];
  // 선택된 차수 혹은 최초 차수
  $scope.selectItem["order"] = {id: '1', name:'1차'};

  // 검침일자(현재날짜)
  $scope.nowDate = $scope.leadingZeros(d.getFullYear(),4) 
        + '-' + $scope.leadingZeros(d.getMonth() + 1, 2) 
        + '-' + $scope.leadingZeros(d.getDate(), 2);

  // db의 검침 초기 데이터를 읽어오는 함수
  $scope.items = new Array();
  $scope.doIomInit = function() {
    var jdata = $scope.selectItem;
    console.log(jdata["year"].name);

    $http.post($scope.WebUrl + "iom02.php", jdata)
      .then(function (res) {
        console.log(res.data);

        var itemList = res.data;
        for (var i = 0; i < itemList.length; i++) {
          console.log('selcor_nm=' + itemList[i].SECTOR_NM);
          $scope.items.push(itemList[i]);
        }        
      });
  };

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
    
  }; // function


})

;
