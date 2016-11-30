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
	description:'Small shinny ring', 
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
db.jobs.insert({jobId:10103, companyId:1000, type:'Repair', startDate:'11/30/2016', endDate:'11/30/2016', startTime:'2:00 PM', description:'This is a fix to old company', instructions:'This should be repair job', parts: [{partNumber:'AE0098123HG', qty: 11 }, { partNumber:'BE0098144HG',qty: 7 } ], techAssignedId:1001, jobCompleteDate:'', totalTime:0, notes:'', managerNotes:''})
db.techActiveJob.insert({techNumber:1001, techName:'Tech Lastname', comanyName:'Some Company',location:'Some City, NJ'})





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