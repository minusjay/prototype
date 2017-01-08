// airFieldb-scheme.js

db.technician.insert({
	techNumber: 1001,
	fname:'Tech',
	lname:'Lastname',
	title:'Lead tech',
	truck:1 
})

db.truck.insert({
	truckId:1, 
	truckInventory :[
		{partNumber:'AE0098123HG', qty: 11 },
		{partNumber:'BE0098144HG',qty: 7 } 
	] 
})

db.inventory.insert({
	partNumber:'AE0098123HG', 
	name:'3/4 Fitting', 
	description:'Small shinny ring'
	quantity:14, 
	lowQuantity:7 
})

db.companies.insert({
	companyId:1000, 
	companyName:'Some Company', 
	contactName:'John Smith', 
	address:'1335 Market St', 
	city:'Some City', 
	state:'NJ', 
	zip:'08245', 
	phone:'609-987-2345'
})

db.jobs.insert({
	jobId:10103, 
	companyId:1000, 
	type:'Repair', 
	startDate:'11/30/2016', 
	endDate:'11/30/2016', 
	startTime:'2:00 PM', 
	description:'This is a fix to old company', 
	instructions:'This should be repair job', 
	parts: [
		{partNumber:'AE0098123HG', qty: 11 },
		{partNumber:'BE0098144HG',qty: 7 } 
	],
	techAssignedId:1001,
	jobCompleteDate:'',
	totalTime:0,
	notes:'',
	managerNotes:'' 
})

db.techActiveJob.insert({
	techNumber:1001,
	techName:'Tech Lastname',
	comanyName:'Some Company',
	location:'Some City, NJ'
})

//------------------
db.technician.insert({techNumber: 1001, fname:'Tech', lname:'Lastname', title:'Lead tech', truck:1 })
db.technician.insert({techNumber: 1002, fname:'John', lname:'Smith', title:'Lead tech', truck:2 })
db.truck.insert({truckId:1, truckInventory :[{ partNumber:'AE0098123HG', qty: 11 }, { partNumber:'BE0098144HG',qty: 7 } ] }) 
db.inventory.insert({partNumber:'AE0098123HG', name:'3/4 Fitting', description:'Small shinny ring', quantity:14, lowQuantity:7 })
db.companies.insert({companyId:1000, companyName:'Some Company', contactName:'John Smith', address:'1335 Market St', city:'Some City', state:'NJ', zip:'08245', phone:'609-987-2345'})
db.companies.insert({companyId:1001, companyName:'Bobs Auto', contactName:'Bob Other', address:'1335 Market St', city:'New City', state:'NJ', zip:'08245', phone:'609-987-2345'})
db.jobs.insert({jobId:10103, companyId:1000, type:'Repair', startDate:'11/30/2016', endDate:'11/30/2016', startTime:'2:00 PM', description:'This is a fix to old company', instructions:'This should be repair job', parts: [{partNumber:'AE0098123HG', qty: 11 }, { partNumber:'BE0098144HG',qty: 7 } ], techAssignedId:1001, jobCompleteDate:'', totalTime:0, notes:'', managerNotes:''})
db.techActiveJob.insert({techNumber:1001, techName:'Tech Lastname', comanyName:'Some Company',location:'Some City, NJ'})

db.jobs.insert({jobId:'', companyId:1000, type:'New Install', startDate:'1/15/2017', endDate:'1/15/2017', startTime:'2:00 PM', description:'This is new install', instructions:'This should be small job', parts: [{partNumber:'AE0098123HG', qty: 11 }, { partNumber:'BE0098144HG',qty: 7 } ], techAssignedId:1001, jobCompleteDate:'', totalTime:0, notes:'', managerNotes:''})
db.jobs.insert({jobId:'', companyId:1001, type:'New Install', startDate:'1/15/2017', endDate:'1/15/2017', startTime:'2:00 PM', description:'This is new install', instructions:'This should be small job', parts: [{partNumber:'AE0098123HG', qty: 11 }, { partNumber:'BE0098144HG',qty: 7 } ], techAssignedId:1002, jobCompleteDate:'', totalTime:0, notes:'', managerNotes:''})
db.jobs.insert({jobId:'', companyId:1000, type:'Checkup', startDate:'1/20/2017', endDate:'1/20/2017', startTime:'10:00 AM', description:'This is follow up to new install', instructions:'Quick review with small OEM swap', parts: [{partNumber:'AE0098123HG', qty: 1 } ], techAssignedId:1001, jobCompleteDate:'', totalTime:0, notes:'', managerNotes:''})
db.jobs.insert({jobId:'', companyId:1000, type:'Maintenance', startDate:'2/21/2017', endDate:'2/21/2017', startTime:'7:00 AM', description:'Replace the filter', instructions:'Replace filter and and new clamp', parts: [{partNumber:'SRG098143GFF', qty: 1 }, { partNumber:'BE0098144HG',qty: 2 } ], techAssignedId:1001, jobCompleteDate:'', totalTime:0, notes:'', managerNotes:''})




db.jobs.aggregate([
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

db.jobs.aggregate([{$match : {_id: '5822849f7ab1209b3d6064ce' } }, {$lookup:{from:"companies", localField:"companyId", foreignField:"companyId", as: "companyDetails"} } ] )