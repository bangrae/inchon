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

.controller('loginDetailCtrl', function(Scopes, $scope, $http, $state, $stateParams) {
  
  var loginJson = $stateParams.loginInfo;
  console.log('log==' + loginJson);

  $scope.jsonItem = {};

  $http.post($scope.WebUrl + "loginDetail.php", loginJson)
    .then(function (res){
            var itemList = res.data;
            //console.log(res.data);
            if (itemList.length > 0) {
              $scope.jsonItem = itemList[0];
            }        
    });

    $scope.doLoginSave = function() {
      var jdata = $scope.jsonItem;

      $http.post($scope.WebUrl + "loginDetailWrite.php", jdata)
        .then(function (res) {
          var son = res.data;

          //console.log(res.data);

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

// 검침 업무 시작 -----------------------------------------------------------------
.controller('iomCtrl', function($scope, $state, $http, $stateParams){
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
    //console.log(jdata["year"].name);
    $scope.secYM = jdata["year"].name + jdata["month"].name;
    $http.post($scope.WebUrl + "iom02.php", jdata)
      .then(function (res) {
        //console.log(res.data);

        var itemList = res.data;
        for (var i = 0; i < itemList.length; i++) {
          //console.log('selcor_nm=' + itemList[i].SECTOR_NM);
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
})  // .controller('iomCtrl')

.controller('iomCtrl3', function($scope, $state, $http, $stateParams){
  var scd = $stateParams.sectorCD;
  var snm = $stateParams.sectorNM;
  var sym = $stateParams.secYM;

  //console.log('sectorInfo=' + scd + '&' + snm + '&' + sym);

  $scope.sectorNm = snm;
  $scope.sectorCd = scd;
  $scope.items = new Array();

  $http.get($scope.WebUrl + "iom03.php?scd="+scd+'&sym='+sym)
    .then(function (res) {
      //console.log('iomCtrl3=' + res.data);
      var itemList = res.data;
      for (var i = 0; i < itemList.length; i++) {
        //console.log(itemList[i].SECTOR_NM + '_' + itemList[i].addr);
        $scope.items.push(itemList[i]);
      }
    });
})

.controller('iomCtrl4', function($scope, $state, $http, $stateParams, $ionicHistory){
  var iomYM = $stateParams.iomYM;
  var custCD = $stateParams.custCD;

  $scope.sitem = {};
  $scope.sitems = {};

  //검침 구분
  $scope.sitems["iomod"] =
    [
    {id: '1', name:'방문검침'},
    {id: '2', name:'고객검침'}
    ];
  $scope.sitem["iomod"] = {id: '1', name:'방문검침'};

  //검침 코드
  $scope.sitems["iomcd"] =
    [
    {id: '1', name:'정상'},
    {id: '2', name:'인정고지'},
    {id: '3', name:'GM교체'},
    {id: '4', name:'회전교체'}
    ];
  $scope.sitem["iomcd"] = {id: '1', name:'정상'};

  $scope.item = new Array();
  $scope.lMonItems = new Array();

  // 검침값 초기화.. (ajax로 인하여 늦게 결과를 가져오기 때문에)
  var ngag = 0;
  var bgag = 0;
  $scope.nused = 0;

  $http.get($scope.WebUrl + "iom04R.php?iomym="+iomYM+"&custcd="+custCD)
    .then(function (res) {
      //console.log('iomCtrl4=' + res.data[0].nbr);
      if (res.data.length > 0) {
        $scope.item = res.data[0];
        ngag = res.data[0].GAG;

        // 검침구분과 검침코드의 콤보박스 아이템을 적용 하기 위하여
        $scope.sitem["iomod"] = $scope.sitems["iomod"][res.data[0].IOM_OD - 1];
        $scope.sitem["iomcd"] = $scope.sitems["iomcd"][res.data[0].IOM_CD - 1];

        $scope.nused = naga = bgag;
      } else {
      }
    }
  );

  // 이전 월을 구하여 이전 검침 자료를 가져오기
  var year = iomYM.substring(0,4);
  var mon = iomYM.substring(4,6);

  var y = new Date();

  y.setYear(year);
  y.setMonth(mon);
  y.setMonth(y.getMonth()-2);

  year = $scope.leadingZeros(y.getFullYear(), 4);
  mon = $scope.leadingZeros(y.getMonth() + 1, 2);

  $http.get($scope.WebUrl + "iom04R.php?iomym="+year+mon+"&custcd="+custCD)
    .then(function (res) {
      //console.log('iomCtrl4=' + res.data[0].nbr);
      if (res.data.length > 0) {
        $scope.lMonItems = res.data[0];
        bgag = res.data[0].GAG;
        $scope.nused = naga = bgag;
      } else {
        $scope.lMonItems["GAG"] = 0;
      }      
    }
  );

  // 사용량 계산을 위해..
  $scope.parseInt = parseInt;
  // iom04.html 페이지 로딩시 처리 끝 --------------


  // 검침량 저장 이벤트
  $scope.doSaveIOM = function() {
    var iomObj = $scope.item;
    var sitem = $scope.sitem;

    console.log('Iom Next ');
    console.log('GAG=' + iomObj["GAG"]);
    console.log('OD=' + sitem["iomod"].name);
    console.log('CD=' + sitem["iomcd"].name);

    var pval = {};
    pval["IOM_OJ_CD"] = iomObj["IOM_OJ_CD"];
    pval["GAG"] = iomObj["GAG"];
    pval["IOM_OD"] = sitem["iomod"].id;
    pval["IOM_CD"] = sitem["iomcd"].id;

    $http.post($scope.WebUrl + "iom04W.php", pval)
      .then(function (res) {
        var son = res.data;

        console.log(res.data);

        if (son.result == 0) {
          alert(son.mesg);
        }
        else {
          alert(son.mesg);
        }

        $ionicHistory.goBack(-1);
        // $state.go('app.loginList');  // 갱신없이 페이지 로딩
//        $state.go('app.iom03', null, {'reload':true});  // 페이지 리로딩
//        Scopes.get('loginListCtrl').loadLoginInfo();        // loginListCtrl의 함수를 call
//        Scopes.clear('loginListCtrl');
      }
    );  // post
  }; // doSaveIOM function


})  // iomCtrl4
// 검침 업무 끝 -----------------------------------------------------------------

// 고객정보 -----------------------------------------------------------------
.controller('custCtrl', function(Scopes, $scope, $http, $state, $stateParams) {
  
  var custCD = $stateParams.custCD;
  console.log('log==' + custCD);

  $scope.jsonItem = {};

  $http.get($scope.WebUrl + "custDetail.php", custCD)
    .then(function (res){
        var itemList = res.data;
        //console.log(res.data);
        if (itemList.length > 0) {
          $scope.jsonItem = itemList[0];
        }
    });
})

;
