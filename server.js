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
app.post('/inventory',function (req,res) {
	console.log(req.body);
	db.inventory.insert(req.body,function (err,doc) {
		res.json(doc);
	});
});

app.get('/techJobs',function (req,res) {
	console.log('techJobs');
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
