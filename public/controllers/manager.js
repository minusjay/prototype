angular.module('airField',['ngRoute'])
	.controller('coreCtrl',CoreCtrl)
	.controller('dashboardCtrl', DashboardCtrl)
	.controller('inventoryCtrl', InventoryCtrl)
	.controller('jobsCtrl', JobsCtrl)
	.controller('addJobCtrl', AddJobCtrl)
	.controller('jobDetailCtrl', JobDetailCtrl)
	.factory('currentSpot',currentSpot)
	.directive('ywActiveMenu',ywActiveMenu)
	.directive('ywMenuId',ywMenuId)
	.config(function($routeProvider){
		$routeProvider.when('/inventory',{
			templateUrl:'views/inventory.html'
		});
		$routeProvider.when('/jobs',{
			templateUrl:'views/jobs.html'
		});
		$routeProvider.when('/addJob',{
			templateUrl:'views/addJob.html'
		});
		$routeProvider.when('/jobDetail',{
			templateUrl:'views/jobDetail.html'
		});
		$routeProvider.otherwise({
			templateUrl:'views/dashboard.html'
		});
	});

//controllers
function CoreCtrl($scope,currentSpot) {

	$scope.isActive = isActive;
	$scope.getTitle = getTitle;
	// $scope.getActiveMenu = getActiveMenu;

	function isActive(menuId) {
		return currentSpot.getActiveMenu() == menuId;
	}

	function getTitle() {
		return currentSpot.getTitle();
	}

	function getActiveMenu() {
		return currentSpot.getActiveMenu();
	}
}

function DashboardCtrl($scope,$http, currentSpot) {

	$http.get('/activejobs').success(function (response) {
		$scope.jobs = response;
	});
	$http.get('/inventory').success(function (response) {
		$scope.inventory = response;
	});
	$http.get('/techJobs').success(function (response) {
		$scope.techs = response;
	});

	var now = new Date().getTime();

   $scope.date = new Date(2015, 10, 10);
   $scope.ago = now < $scope.date.getTime();
   $scope.before = now > $scope.date.getTime();
}

function InventoryCtrl($scope, $http, currentSpot) {
	currentSpot.setCurrentSpot('Inventory')
	var refresh = function () {
		$scope.part = "";
		$http.get('/inventory').success(function (response) {
			$scope.inventory = response;
		});
	}
	refresh();

	$scope.addPart = function () {
		$http.post('/inventory',$scope.part).success(function (response) {
			console.log(response);
			refresh();
		});
	}
}

function JobsCtrl($scope,$http) {
	$http.get('/activejobs').success(function (response) {
		$scope.jobs = response;
	});
}

function AddJobCtrl($scope,$http) {
	$scope.companyShow = true;
	$http.get('/companies').success(function (response) {
		$scope.companies = response;
	});
	$http.get('/inventory').success(function (response) {
		$scope.inventory = response;
	});
	$http.get('/technician').success(function (response) {
		$scope.technicians = response;
	});

	$scope.existingCompany = function () {
		// console.log($scope.selectComp.companyId);
		$scope.newJob;
		console.log($scope.newJob);
		var company = $scope.newJob.companyId;
		console.log($scope.newJob.companyId);
		$http.get('/companies/'+$scope.newJob.companyId._id).success(function (response) {
			$scope.company = response;
			console.log(response);
			$scope.companyShow = false;
		});
	};
	$scope.addJob = function () {
		// $scope.newJob = {
		// 	jobId : '1111',
		// 	companyId : $scope.selectComp.companyId,
		// 	type: $scope.
		// };
		console.log($scope.newJob);
		
		// $http.post('/activeJobs',$scope.newJob).success(function (response) {
		// 	//redirect
		// })
	}
}

function JobDetailCtrl($scope) {
}

//factory
function currentSpot() {
	var activeMenuId = '',
		titleText = '';

	return {
		setCurrentSpot: function (menuId,title) {
			activeMenuId = menuId;
			titleText = title;
		},
		getActiveMenu: function () {
			return activeMenuId;
		},
		getTitle: function () {
			return titleText;
		}
	}
}

//directives
function ywActiveMenu(currentSpot) {
  return function (scope, element, attrs) {
    var activeMenuId = attrs["ywActiveMenu"];
    var activeTitle = attrs["ywActiveTitle"];
    currentSpot.setCurrentSpot(activeMenuId, activeTitle);
  }
}
function ywMenuId(currentSpot) {
	var menuElements = [];

	function setActive(element, menuId) {
		if (currentSpot.getActiveMenu() == menuId) {
		  element.addClass('active');
		} else {
		  element.removeClass('active');
		}
	}

	return function (scope, element, attrs) {
	    var menuId = attrs["ywMenuId"];
	    menuElements.push({ id: menuId, node: element });
	    // setActive(element, menuId);
	    var watcherFn = function (watchScope) {
	      return watchScope.$eval('getActiveMenu()');
	    }
	    scope.$watch(watcherFn, function (newValue, oldValue) {
	      for (var i = 0; i < menuElements.length; i++) {
	        var menuElement = menuElements[i];
	        setActive(menuElement.node, menuElement.id);
	      }
	    });
	}
}