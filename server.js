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
			{$match:{managerNotes:''}},
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
	db.jobs.insert(req.body,function (err,doc) {
		res.json(doc);
	});
});
app.put('/activejobs/:id',function(req,res){
	var id = req.params.id;
	db.jobs.findAndModify({query:{_id:mongojs.ObjectId(id)},
		update:{$set:{managerNotes:req.body.managerNotes}},
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
			{$match:{managerNotes : {$exists:true}, $where: "this.managerNotes.length > 0"}},
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

app.get('/techJobs',function (req,res) {
	db.techActiveJob.find(function(err,doc){
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
//tech end points


app.listen(3030);
console.log('server running on 3030');
