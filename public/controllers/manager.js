var now = new Date().getTime();

angular.module('airField',['ngRoute','ui.bootstrap'])
	.controller('coreCtrl',CoreCtrl)
	.controller('dashboardCtrl', DashboardCtrl)
	.controller('inventoryCtrl', InventoryCtrl)
	.controller('jobsCtrl', JobsCtrl)
	.controller('addJobCtrl', AddJobCtrl)
	.controller('jobDetailCtrl', JobDetailCtrl)
	.controller('invoiceCtrl',InvoiceCtrl)
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
		$routeProvider.when('/invoice',{
			templateUrl:'views/invoice.html'
		});
		$routeProvider.otherwise({
			templateUrl:'views/dashboard.html'
		});
	})
	.run(function ($rootScope, $uibModalStack) { 
		$rootScope.$on('$routeChangeSuccess', function (newVal, oldVal) { 
			if (oldVal !== newVal) { 
				$uibModalStack.dismissAll(); 
			} 
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
		console.log(response);
		
	});
	
	$http.get('/techJobs').success(function (response) {
		$scope.techs = response;
	});

	$http.get('/activeJobFull').success(function (response) {
		console.log(response);
		$scope.fullTech = [
			{
				techDetails:{fname:'John', lname:'Smith'},
				companyDetails:{
					companyName:'Bobs Auto',
					city:'New City',
					state:'NJ',
					zip:''
				}
			},
			{
				techDetails:{fname:'Nick', lname:'Ryan'},
				companyDetails:{
					companyName:'Some Company',
					city:'Some City',
					state:'NJ',
					zip:''
				}
			},
			{
				techDetails:{fname:'Jeff', lname:'Stevens'},
				companyDetails:{
					companyName:'Ricks Stuff',
					city:'Next City',
					state:'NJ',
					zip:''
				}
			},
		];

	});

	$scope.date = new Date(2015, 10, 10);
	$scope.ago = now < $scope.date.getTime();
	$scope.before = now > $scope.date.getTime();
	var refreshInventory = function () {
		$http.get('/inventory').success(function (response) {
			$scope.inventory = response;
		});
	};
	refreshInventory();

   $scope.editInv = function (id) {
   	
   	$scope.inv = "";
   	$http.get('/inventory/'+id).success(function (response) {
		$scope.inv = response;
		$scope.editInventory = true;
	});
   };
   
   $scope.cancelInv = function () {
   	$scope.inv = "";
   	$scope.editInventory = false;
   };

   $scope.updateInv = function () {
   	$http.put('/inventory/'+$scope.inv._id,$scope.inv).success(function (response) {
   		refreshInventory();
   		$scope.inv = "";
   		$scope.editInventory = false;
   	});
   };

   $scope.viewJob = function (id) {
   	$http.get('/activejobs/'+id).success(function (response) {
   		$scope.selectedJob = response[0];
   	});
   	
   	
   };
   
}

function InventoryCtrl($scope, $http, currentSpot) {
	currentSpot.setCurrentSpot('Inventory');
	$scope.sortType     = 'name'; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order

	var refresh = function () {
		$scope.part = "";
		$scope.editing = false;
		$http.get('/inventory').success(function (response) {
			$scope.inventory = response;
		});
	}
	refresh();

	$scope.addPart = function () {
		$http.post('/inventory',$scope.part).success(function (response) {
			refresh();
		});
	}

	$scope.editPart = function (id) {
		$scope.editing = true;
		$http.get('/inventory/'+id).success(function (response) {
			$scope.part = response;
			console.log(response);
		});
	};
	$scope.updatePart = function () {
		$http.put('/inventory/'+$scope.part._id,$scope.part).success(function (response) {
			refresh();
		});
	};
	$scope.cancelPart = function () {
		$scope.part = "";
		refresh();
	};
}

function JobsCtrl($scope,$http,$routeParams,$filter) {
	$('body').removeClass('modal-open');
	$('.modal-backdrop').remove();
	
	var job_id = $routeParams.id;
	
	$scope.selectedJob = '';
	$scope.jobID = job_id;
	$scope.technicians ="";
	
	if(job_id){
		$scope.selectedJob = getSelectedJob(job_id);
	}
	var refreshJobs = function () {
		$http.get('/activejobs').success(function (response) {
			$scope.jobs = response;
		});

		$http.get('/alljobs').success(function (response) {
			$scope.alljobs = response;
		});

		$http.get('/inventory').success(function (response) {
			$scope.inventory = response;
		});

		$http.get('/technician').success(function (response) {
			$scope.technicians = response;
		});

		$http.get('/companies').success(function (response) {
			$scope.companies = response;
		});
	};
	refreshJobs();

	$scope.viewJob = function (id) {
		$scope.selectedJob = getSelectedJob(id);
	};

	$scope.closeOpenJob = function () {
		$scope.editJob = false;
		$scope.selectedJob = '';
	};
	$scope.updateJob = function (id) {
		//make a new enpoint that does all the work
		var company_id = $scope.selectedJob.companyDetails._id,
			selCompany = $filter("filter")($scope.companies,{companyId:company_id},true),
			selCompName = selCompany.length == 1? selCompany[0].companyName : null,
			selCompLoc = selCompany.length == 1? selCompany[0].location : null;

		var updates = {
			_id:id,
			techAssignedId:$scope.selectedJob.techAssignedId.techNumber,
			jobCompleteDate:$scope.selectedJob.jobCompleteDate,
			totalTime:$scope.selectedJob.totalTime,
			jobId:$scope.selectedJob.jobId,
			managerNotes:$scope.selectedJob.managerNotes,
			companyName:selCompName,
			location:selCompLoc,
			startDate:$scope.selectedJob.startDate,
			endDate:$scope.selectedJob.endDate
		};
		
		/*if($scope.selectedJob.techAssignedName == "No Tech Assigned" ){
			//no tech set
			$http.put('/updateJobTech',updates).success(function (response) {
				console.log('update eveything');
			});
		} else {
		}*/
			$http.put('/activejobs/'+id, updates).success(function (response) {
				$scope.editJob = false;
				$scope.selectJob = '';
				refreshJobs();
				
			});

	};

	$scope.setSelectedJob = function (id) {
		$scope.selectedJob = getSelectedJob(id);
	};
	
	function getSelectedJob(id) {
		$scope.editJob = true;
		$scope.selectedJob.techAssignedName = "";
		$http.get('/activejobs/'+id).success(function (response) {
	   		$scope.selectedJob = response[0];
	   		var techName = $filter("filter")($scope.technicians, {techNumber:$scope.selectedJob.techAssignedId},true);
	   		$scope.selectedJob.techAssignedName = techName.length == 1 ? techName[0].fname +' '+techName[0].lname : "No Tech Assigned";
	   		return $scope.selectedJob;
	   	});
	}

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

	$scope.newJob;
	$scope.existingCompany = function () {
		$http.get('/companies/'+$scope.newJob.companyId._id).success(function (response) {
			$scope.company = response;
			$scope.companyShow = false;
		});
	};
	$scope.addJob = function () {
		var _parts = [];
		angular.forEach($scope.newJob.part, function(value, key) {
		  var x = {'partNumber':key,'qty':value}
		  this.push(x);
		}, _parts);
		
		var job = $scope.newJob,
			techN = $scope.newJob.techAssignedId.techNumber,
			compId = $scope.newJob.companyId.companyId,
			insertJob = {
				companyId:compId,
				type:job.type,
				startDate:job.startDate,
				endDate:job.endDate,
				description:job.description,
				instructions:job.instructions,
				techAssignedId:techN,
				parts:_parts
			};
		
		
		$http.post('/activeJobs',insertJob).success(function (response) {
			
			$scope.newJob = "";
		});

		//if tech added to job

	}
}

function JobDetailCtrl($scope) {
}

function InvoiceCtrl($scope, $http, currentSpot) {
	$http.get('/completedjobs').success(function (response) {
		$scope.jobs = response;
		console.log(response);
		
	});

	$scope.createInvoice = function (id) {
		$http.get('/activejobs/'+id).success(function (response) {
	   		$scope.seljob = response[0];
	   	});
	};
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