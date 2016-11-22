angular.module('airField',['ngRoute'])
	.controller('dashboardCtrl', DashboardCtrl)
	.controller('inventoryCtrl', InventoryCtrl)
	.controller('newItemCtrl', NewItemCtrl)
	.controller('jobsCtrl', JobsCtrl)
	.controller('addJobCtrl', AddJobCtrl)
	.controller('jobDetailCtrl', JobDetailCtrl)
	.config(function($routeProvider){
		$routeProvider.when('/inventory',{
			templateUrl:'views/inventory.html'
		});
		$routeProvider.when('/newItem',{
			templateUrl:'views/newItem.html'
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
function DashboardCtrl($scope,$http) {
	// $scope.jobs = jobsData;
	// $scope.parts = inventoryData;
	// $scope.techs = techData;

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

function InventoryCtrl($scope, $http) {
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

function NewItemCtrl($scope) {

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
		$http.get('/companies/'+$scope.selectComp._id).success(function (response) {
			$scope.company = response;
			console.log(response);
			$scope.companyShow = false;
		});
	};
	$scope.addJob = function () {
		$scope.newJob = {
			jobId : '1111',
			companyId : $scope.selectComp.companyId
		};
		console.log($scope.newJob);
		
		// $http.post('/activeJobs',$scope.newJob).success(function (response) {
		// 	//redirect
		// })
	}
}

function JobDetailCtrl($scope) {

}

