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
			company:'Company Name 1',
			type:'Lorem ipsum dolor sit amet'
		},
		{
			id:1004,
			company:'Company Name 3',
			type:'Lorem ipsum dolor sit amet'
		},
		{
			id:1023,
			company:'Company Name234',
			type:'Lorem ipsum dolor sit amet'
		},
		{
			id:1121,
			company:'Company Name541',
			type:'Lorem ipsum dolor sit amet'
		}

	];
}

function TechJobCtrl($scope,$routeParams,$filter) {
	$scope.ID = $routeParams.ID;
	var job;
	
	$scope.jobs = [
		{
			id:1001,
			company:'Company Name 1',
			type:'Lorem ipsum dolor sit amet',
			startTime:'9:00 AM',
			contact:{
				name:'Steve Doe',
				address:'1355 Market Street, Suit 900',
				city:'Some City',
				state:'NJ',
				zip:'08000',
				phone:'(123) 456-7890'
			},
			description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam esse voluptatum, reiciendis eius pariatur blanditiis vel ducimus doloribus. Sed id, fuga dolorem. Assumenda adipisci laboriosam rem deserunt fuga, eos at. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti cum accusantium magni expedita in ratione, ipsam rerum porro delectus quo. Eaque, voluptates repellat reiciendis ut ipsam odit molestiae expedita eius!',
			instrucitons:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam esse voluptatum, reiciendis eius pariatur blanditiis vel ducimus doloribus. Sed id, fuga dolorem. Assumenda adipisci laboriosam rem deserunt fuga, eos at. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti cum accusantium magni expedita in ratione, ipsam rerum porro delectus quo. Eaque, voluptates repellat reiciendis ut ipsam odit molestiae expedita eius!',
			parts:[
				{id:203, name:'Cras justo odio',qty:14},
				{id:203, name:'Rusto odio',qty:1},
				{id:203, name:'Dio',qty:3}
			]
		},
		{
			id:1004,
			company:'Company Name 3',
			type:'Lorem ipsum dolor sit amet',
			startTime:'11:00 AM',
			contact:{
				name:'Steve Doe',
				address:'1355 Market Street, Suit 900',
				city:'Some City',
				state:'NJ',
				zip:'08000',
				phone:'(123) 456-7890'
			},
			description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam esse voluptatum, reiciendis eius pariatur blanditiis vel ducimus doloribus. Sed id, fuga dolorem. Assumenda adipisci laboriosam rem deserunt fuga, eos at. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti cum accusantium magni expedita in ratione, ipsam rerum porro delectus quo. Eaque, voluptates repellat reiciendis ut ipsam odit molestiae expedita eius!',
			instrucitons:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam esse voluptatum, reiciendis eius pariatur blanditiis vel ducimus doloribus. Sed id, fuga dolorem. Assumenda adipisci laboriosam rem deserunt fuga, eos at. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti cum accusantium magni expedita in ratione, ipsam rerum porro delectus quo. Eaque, voluptates repellat reiciendis ut ipsam odit molestiae expedita eius!',
			parts:[
				{id:203, name:'Cras justo odio',qty:14},
				{id:203, name:'Rusto odio',qty:1},
				{id:203, name:'Dio',qty:3}
			]
		},
		{
			id:1023,
			company:'Company Name234',
			type:'Lorem ipsum dolor sit amet',
			startTime:'1:00 PM',
			contact:{
				name:'Steve Doe',
				address:'1355 Market Street, Suit 900',
				city:'Some City',
				state:'NJ',
				zip:'08000',
				phone:'(123) 456-7890'
			},
			description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam esse voluptatum, reiciendis eius pariatur blanditiis vel ducimus doloribus. Sed id, fuga dolorem. Assumenda adipisci laboriosam rem deserunt fuga, eos at. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti cum accusantium magni expedita in ratione, ipsam rerum porro delectus quo. Eaque, voluptates repellat reiciendis ut ipsam odit molestiae expedita eius!',
			instrucitons:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam esse voluptatum, reiciendis eius pariatur blanditiis vel ducimus doloribus. Sed id, fuga dolorem. Assumenda adipisci laboriosam rem deserunt fuga, eos at. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti cum accusantium magni expedita in ratione, ipsam rerum porro delectus quo. Eaque, voluptates repellat reiciendis ut ipsam odit molestiae expedita eius!',
			parts:[
				{id:203, name:'Cras justo odio',qty:14},
				{id:203, name:'Rusto odio',qty:1},
				{id:203, name:'Dio',qty:3}
			]
		},
		{
			id:1121,
			company:'Company Name541',
			type:'Lorem ipsum dolor sit amet',
			startTime:'3:00 PM',
			contact:{
				name:'Steve Doe',
				address:'1355 Market Street, Suit 900',
				city:'Some City',
				state:'NJ',
				zip:'08000',
				phone:'(123) 456-7890'
			},
			description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam esse voluptatum, reiciendis eius pariatur blanditiis vel ducimus doloribus. Sed id, fuga dolorem. Assumenda adipisci laboriosam rem deserunt fuga, eos at. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti cum accusantium magni expedita in ratione, ipsam rerum porro delectus quo. Eaque, voluptates repellat reiciendis ut ipsam odit molestiae expedita eius!',
			instrucitons:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam esse voluptatum, reiciendis eius pariatur blanditiis vel ducimus doloribus. Sed id, fuga dolorem. Assumenda adipisci laboriosam rem deserunt fuga, eos at. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti cum accusantium magni expedita in ratione, ipsam rerum porro delectus quo. Eaque, voluptates repellat reiciendis ut ipsam odit molestiae expedita eius!',
			parts:[
				{id:203, name:'Cras justo odio',qty:14},
				{id:203, name:'Rusto odio',qty:1},
				{id:203, name:'Dio',qty:3}
			]
		}
	];
	
	job = $scope.jobs.filter(function(job){
		return (job.id == $scope.ID);
	});
	
	$scope.job = job[0];
}

