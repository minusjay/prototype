angular.module('cae',['ngRoute'])
	.controller('shopTechCtrl', ShopTechCtrl)
	.controller('techJobCtrl', TechJobCtrl)
	.config(function($routeProvider){
		$routeProvider.when('/techList',{
			templateUrl:'views/techList.html'
		});
		$routeProvider.when('/techJob',{
			templateUrl:'views/techJob.html'
		});
		$routeProvider.otherwise({
			templateUrl:'views/techList.html'
		});
	});

function ShopTechCtrl($scope) {
	$scope.jobs = [
		{
			id:1001,
			company:'Bobs Auto',
			type:'New Install'
		},
		{
			id:1004,
			company:'Acme Corporation',
			type:'Repair'
		},
		{
			id:1023,
			company:'Globex',
			type:'Maintenance'
		}
	];
}

function TechJobCtrl($scope,$routeParams,$filter) {
	$scope.ID = $routeParams.ID;
	var job;
	
	$scope.jobs = [
		{
			id:1001,
			company:'Bobs Auto',
			type:'New Install',
			startTime:'9:00 AM',
			contact:{
				name:'Bob Other',
				address:'1335 Market St',
				city:'New City',
				state:'NJ',
				zip:'08245',
				phone:'609-987-2345'
			},
			description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam esse voluptatum, reiciendis eius pariatur blanditiis vel ducimus doloribus. Sed id, fuga dolorem. Assumenda adipisci laboriosam rem deserunt fuga, eos at. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti cum accusantium magni expedita in ratione, ipsam rerum porro delectus quo. Eaque, voluptates repellat reiciendis ut ipsam odit molestiae expedita eius!',
			instrucitons:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam esse voluptatum, reiciendis eius pariatur blanditiis vel ducimus doloribus. Sed id, fuga dolorem. Assumenda adipisci laboriosam rem deserunt fuga, eos at. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti cum accusantium magni expedita in ratione, ipsam rerum porro delectus quo. Eaque, voluptates repellat reiciendis ut ipsam odit molestiae expedita eius!',
			parts:[
				{id:203, name:'Valve',qty:6},
				{id:203, name:'Washer 3/4',qty:12},
				{id:203, name:'Screw Cap 3/4',qty:5}
			]
		},
		{
			id:1004,
			company:'Acme Corporation',
			type:'Repair',
			startTime:'11:00 AM',
			contact:{
				name:'Laverne S Smith',
				address:'302 Rt 11',
				city:'Galena',
				state:'NJ',
				zip:'08245',
				phone:'417-357-1338'
			},
			description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam esse voluptatum, reiciendis eius pariatur blanditiis vel ducimus doloribus. Sed id, fuga dolorem. Assumenda adipisci laboriosam rem deserunt fuga, eos at. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti cum accusantium magni expedita in ratione, ipsam rerum porro delectus quo. Eaque, voluptates repellat reiciendis ut ipsam odit molestiae expedita eius!',
			instrucitons:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam esse voluptatum, reiciendis eius pariatur blanditiis vel ducimus doloribus. Sed id, fuga dolorem. Assumenda adipisci laboriosam rem deserunt fuga, eos at. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti cum accusantium magni expedita in ratione, ipsam rerum porro delectus quo. Eaque, voluptates repellat reiciendis ut ipsam odit molestiae expedita eius!',
			parts:[
				{id:203, name:'Nut HEX 3/4-10',qty:14},
				{id:203, name:'Adapter 5FNP',qty:7},
				{id:203, name:'CLPC HSE',qty:3}
			]
		},
		{
			id:1023,
			company:'Globex',
			type:'Maintenance',
			startTime:'1:00 PM',
			contact:{
				name:'Cora Smith',
				address:'392 Frank St',
				city:'Sharon',
				state:'NJ',
				zip:'08245',
				phone:'609-538-7280'
			},
			description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam esse voluptatum, reiciendis eius pariatur blanditiis vel ducimus doloribus. Sed id, fuga dolorem. Assumenda adipisci laboriosam rem deserunt fuga, eos at. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti cum accusantium magni expedita in ratione, ipsam rerum porro delectus quo. Eaque, voluptates repellat reiciendis ut ipsam odit molestiae expedita eius!',
			instrucitons:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam esse voluptatum, reiciendis eius pariatur blanditiis vel ducimus doloribus. Sed id, fuga dolorem. Assumenda adipisci laboriosam rem deserunt fuga, eos at. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti cum accusantium magni expedita in ratione, ipsam rerum porro delectus quo. Eaque, voluptates repellat reiciendis ut ipsam odit molestiae expedita eius!',
			parts:[
				{id:203, name:'Washer 3/4',qty:9},
				{id:203, name:'Nut HEX 3/4-10',qty:11},
				{id:203, name:'CLPC HSE',qty:4}
			]
		}
	];
	
	job = $scope.jobs.filter(function(job){
		return (job.id == $scope.ID);
	});
	
	$scope.job = job[0];
}

