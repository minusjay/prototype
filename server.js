var express = require('express'),
	app = express(),
	mongojs = require('mongojs'),
	db = mongojs('airFieldb',['technician','truck','inventory','companies','jobs','techActiveJob']),
	bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//manager end points
app.get('/activejobs',function (req,res) {
	db.jobs.aggregate(
		[
			{$match:{jobCompleteDate: null}},
			{
				$lookup:{
					from:"companies",
					localField:"companyId",
					foreignField:"companyId",
					as: "companyDetails"
				}
			},
				{
					$lookup:{
						from:'technician',
						localField:'techAssignedId',
						foreignField:'techNumber',
						as:'techDetails'
					}
				},
				{
					$unwind:'$techDetails'
				}
			
		], function (err,doc) {
			// console.log(doc);
			res.json(doc);
		}
	);
});

app.get('/activejobs/:id',function (req,res) {
	var id = req.params.id;
	
	db.jobs.aggregate(
		[
			{$match : {_id:mongojs.ObjectId(id) } },
			{$lookup:{
					from:"companies",
					localField:"companyId",
					foreignField:"companyId",
					as: "companyDetails"
				}
			},
			{$unwind:'$companyDetails'}
		], function (err,doc) {
			res.json(doc);
		}
	);
});
app.post('/activejobs',function (req,res) {
	//post new job to db.job 
	//if job has techId update db.techActiveJob with company name and location

	db.jobs.insert(req.body,function (err,doc) {
		res.json(doc);
	});
});
app.put('/activejobs/:id',function(req,res){
	var id = req.params.id;
	db.jobs.findAndModify({query:{_id:mongojs.ObjectId(id)},
		update:{$set:{
			techAssignedId:req.body.techAssignedId,
			jobCompleteDate:req.body.jobCompleteDate,
			totalTime:req.body.totalTime,
			jobId:req.body.jobId,
			managerNotes:req.body.managerNotes,
			startDate:req.body.startDate,
			endDate:req.body.endDate
		}},
		new:true}, function(err,doc){
			res.json(doc);
		});
});
app.get('/alljobs',function (req,res) {
	db.jobs.aggregate(
		[
			{
				$lookup:{
					from:"companies",
					localField:"companyId",
					foreignField:"companyId",
					as: "companyDetails"
				}
			}
		], function (err,doc) {
			// console.log(doc);
			res.json(doc);
		}
	);
});
app.get('/completedjobs',function (req,res) {
	db.jobs.aggregate(
		[
			{$match:{jobCompleteDate : {$ne:null}}},
			{
				$lookup:{
					from:"companies",
					localField:"companyId",
					foreignField:"companyId",
					as: "companyDetails"
				}
			}
		], function (err,doc) {
			// console.log(doc);
			res.json(doc);
		}
	);
});
app.get('/activeJobFull',function (req,res) {
	db.jobs.aggregate([
		{$match:{jobCompleteDate: null}},
		{
			$lookup:{
				from:'companies',
				localField:'companyId',
				foreignField:'companyId',
				as:'companyDetails'
			}
		},
		{
			$unwind:'$companyDetails'
		},
		{
			$lookup:{
				from:'technician',
				localField:'techAssignedId',
				foreignField:'techNumber',
				as:'techDetails'
			}
		},
		{
			$unwind:'$techDetails'
		}
	],function(err,doc){
		res.json(doc);
	});
});

app.get('/inventory',function (req,res) {
	db.inventory.find(function (err,doc) {
		res.json(doc);
	});
});
app.get('/inventory/:id',function (req,res) {
	var id = req.params.id;
	db.inventory.findOne({_id:mongojs.ObjectId(id)},function (err,doc) {
		res.json(doc);
	});
});
app.post('/inventory',function (req,res) {
	db.inventory.insert(req.body,function (err,doc) {
		res.json(doc);
	});
});
app.put('/inventory/:id',function (req,res) {
	var id = req.params.id;
	db.inventory.findAndModify({query:{_id:mongojs.ObjectId(id)},
		update:{$set:{partNumber:req.body.partNumber, name:req.body.name, quantity:req.body.quantity}},
		new:true}, function (err,doc) {
			res.json(doc);
		});
});

app.get('/companies',function (req,res) {
	db.companies.find(function (err,doc) {
		res.json(doc);
	});
});
app.get("/companies/:id",function (req,res) {
	var id = req.params.id;
	db.companies.findOne({_id: mongojs.ObjectId(id)}, function (err,doc) {
		res.json(doc);
	});
});

app.get('/technician',function (req,res) {
	db.technician.find(function (err,doc) {
		res.json(doc);
	});
});

app.get('/techJobs',function (req,res) {
	db.techActiveJob.find(function(err,doc){
		res.json(doc);
	});
});
app.put('/techJobs/:id',function (req,res) {
	var id = req.params.id
		_companyName = req.body.companyName,
		_location = req.body.city + ', ' + req.body.state +' '+req.body.zip;
	console.log('techJobs:'+id +' '+_companyName);
	
	db.techActiveJob.findAndModify({
		query:{techNumber:id},
		update:{$set: {companyName:_companyName, location: _location}},
		new:true
	},
		function (err,doc) {
			res.json(doc);
			
		});
});

app.put('/updateJobTech', function (req,res) {
	var id = req.body._id,
		techAssignedId = req.body.techAssignedId,
		jobCompleteDate = req.body.jobCompleteDate,
		totalTime = req.body.totalTime,
		jobId = req.body.jobId,
		managerNotes = req.body.managerNotes,
		_companyName = req.body.companyId,
		_location = req.body.location;

	db.techActiveJob.findAndModify({
		query:{techNumber:techAssignedId},
		update:{$set: {companyName:_companyName, location: _location}},
		new:true
	},
		function (err,doc) {
			// res.json(doc);
			console.log('active tech update error: '+err);
			
		});

	db.jobs.findAndModify({query:{_id:mongojs.ObjectId(id)},
		update:{$set:{
			techAssignedId:techAssignedId,
			jobCompleteDate:jobCompleteDate,
			totalTime:totalTime,
			jobId:jobId,
			managerNotes:managerNotes,
		}},
		new:true},
		function (err,doc) {
			// res.json(doc);
			console.log('job update err '+err);
			
		});
});
//tech end points


app.listen(3030);
console.log('server running on 3030');
