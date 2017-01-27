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
db.jobs.insert({jobId:10103, companyId:1000, type:'Repair', startDate:'11/30/2016', endDate:'11/30/2016', startTime:'2:00 PM', description:'This is a fix to old company', instructions:'This should be repair job', parts: [{partNumber:'AE0098123HG', qty: 11 }, { partNumber:'BE0098144HG',qty: 7 } ], techAssignedId:1001, jobCompleteDate:'11/30/2016', totalTime:5, notes:'under estimated total time', managerNotes:'estimation adjusted for next time'})
db.techActiveJob.insert({techNumber:1001, techName:'Tech Lastname', comanyName:'Some Company',location:'Some City, NJ'})

db.jobs.insert({jobId:'', companyId:1000, type:'New Install', startDate:'1/15/2017', endDate:'1/15/2017', startTime:'2:00 PM', description:'This is new install', instructions:'This should be small job', parts: [{partNumber:'AE0098123HG', qty: 11 }, { partNumber:'BE0098144HG',qty: 7 } ], techAssignedId:1001})

db.jobs.insert({jobId:'', companyId:1000, type:'New Install', startDate:'1/15/2017', endDate:'1/15/2017', startTime:'2:00 PM', description:'This is new install', instructions:'This should be small job', parts: [{partNumber:'AE0098123HG', qty: 11 }, { partNumber:'BE0098144HG',qty: 7 } ]})
db.jobs.insert({jobId:'', companyId:1001, type:'New Install', startDate:'1/15/2017', endDate:'1/15/2017', startTime:'2:00 PM', description:'This is new install', instructions:'This should be small job', parts: [{partNumber:'AE0098123HG', qty: 11 }, { partNumber:'BE0098144HG',qty: 7 } ]})
db.jobs.insert({jobId:'', companyId:1000, type:'Checkup', startDate:'1/20/2017', endDate:'1/20/2017', startTime:'10:00 AM', description:'This is follow up to new install', instructions:'Quick review with small OEM swap', parts: [{partNumber:'AE0098123HG', qty: 1 } ]})
db.jobs.insert({jobId:'', companyId:1000, type:'Maintenance', startDate:'2/21/2017', endDate:'2/21/2017', startTime:'7:00 AM', description:'Replace the filter', instructions:'Replace filter and and new clamp', parts: [{partNumber:'SRG098143GFF', qty: 1 }, { partNumber:'BE0098144HG',qty: 2 } ]})

db.techActiveJob.insert({techNumber:1002,techName:"John Smith",companyName:"",location:""})
db.techActiveJob.insert({techNumber:1003,techName:"Jeff Stevens",companyName:"",location:""})
db.techActiveJob.insert({techNumber:1004,techName:"Nick Ryan",companyName:"",location:""})

db.companies.insert({companyId:1003, companyName:'Ricks Stuff', contactName:'Rick Other', address:'227 Road St', city:'Ex City', state:'NJ', zip:'08245', phone:'609-987-2345'})

db.companies.insert({companyId:1002, companyName:'Acme Corporation', contactName:'Laverne S Smith', address:'302 Rt 11', city:'Galena', state:'NJ', zip:'08245', phone:'417-357-1338'})
db.companies.insert({companyId:1004, companyName:'Globex', contactName:'Cora Smith', address:'392 Frank St', city:'Sharon', state:'NJ', zip:'08245', phone:'609-538-7280'})
db.companies.insert({companyId:1005, companyName:'Initech', contactName:'Dogulas Evans', address:'1361 Coolidge Ave', city:'Harrison', state:'NJ', zip:'08625', phone:'856-987-2322'})
db.companies.insert({companyId:1006, companyName:'Massive Dynamic', contactName:'Susan Johnson', address:'4370 Fiedler Ave', city:'Maple Lake', state:'NJ', zip:'08015', phone:'609-543-2345'})
db.companies.insert({companyId:1007, companyName:'Hooli', contactName:'Mike Church', address:'512 Ely St', city:'Carrollton', state:'NJ', zip:'08765', phone:'856-487-2345'})






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


db.jobs

db.jobs.findAndModify({query:{companyId:1003}, update:{$set:{techAssignedId:null}}, new:true })

db.jobs.aggregate([{$lookup:{from:'companies', localField:'companyId', foreignField:'companyId', as:'companyDetails'} }, {$unwind:'$companyDetails'}, {$lookup:{from:'technician', localField:'techAssignedId', foreignField:'techNumber', as:'techDetails'} }, {$unwind:'$techDetails'} ])





// query
inventory 
{ "_id" : ObjectId("581f9b947ab1209b3d6064ca"), "partNumber" : "AE0098123HG", "name" : "3/4 Fitting", "description" : "Small shinny ring", "quantity" : 5, "lowQuantity" : 7 }
{ "_id" : ObjectId("5833acd6f6c20a72e5606c5b"), "name" : "test Part", "partNumber" : "FE09821123HG", "description" : "test part added from site", "quantity" : 30, "lowQuantity" : 8 }
{ "_id" : ObjectId("584f43562c02720eec2ae3eb"), "name" : "Valve", "partNumber" : "WE7871HS8", "description" : "you know for that thing", "quantity" : 40, "lowQuantity" : 3 }
{ "_id" : ObjectId("588aaaded0ab0c9a28338663"), "name" : "Nut HEX 3/4-10", "partNumber" : "126272120", "description" : "Details", "quantity" : 30, "lowQuantity" : 10 }
{ "_id" : ObjectId("588aad34d0ab0c9a28338664"), "name" : "Washer 3/4", "partNumber" : "12633547", "description" : "Lock SS", "quantity" : 100, "lowQuantity" : 20 }
{ "_id" : ObjectId("588aad6bd0ab0c9a28338665"), "name" : "Adapter 5FNP", "partNumber" : "124325891", "description" : "MNH CP #418", "quantity" : 40, "lowQuantity" : 8 }
{ "_id" : ObjectId("588aada8d0ab0c9a28338666"), "name" : "Screw Cap 3/4", "partNumber" : "126216071", "description" : "Hex HS 3/4-10", "quantity" : 15, "lowQuantity" : 4 }
{ "_id" : ObjectId("588aae3ad0ab0c9a28338667"), "name" : "CLPC HSE", "partNumber" : "124221401", "description" : "1 FSWJIC x 1 Crimp", "quantity" : 10, "lowQuantity" : 2 }
{ "_id" : ObjectId("588aaf34d0ab0c9a28338668"), "name" : "Crown Bolt 3/8", "partNumber" : "86610", "description" : "3/8in x 2in Plain Plow", "quantity" : 50, "lowQuantity" : 10 }
{ "_id" : ObjectId("588aaf70d0ab0c9a28338669"), "name" : "Crown Bolt 1/2", "partNumber" : "86700", "description" : "1/2in x 1-1/2 Plain Plow", "quantity" : 80, "lowQuantity" : 10 }
{ "_id" : ObjectId("588aafddd0ab0c9a2833866a"), "name" : "Crown Bolt 1/2", "partNumber" : "101700", "description" : "1/2in x 6in External Hex", "quantity" : 33, "lowQuantity" : 8 }


jobs
{ "_id" : ObjectId("5871b951fe9e5914f90a383c"), "jobId" : "100563", "companyId" : 1000, "type" : "New Install", "startDate" : "1/15/2017", "endDate" : "1/15/2017", "startTime" : "2:00 PM", "description" : "This is new install", "instructions" : "This should be small job", "parts" : [ { "partNumber" : "AE0098123HG", "qty" : 11 }, { "partNumber" : "BE0098144HG", "qty" : 7 } ], "techAssignedId" : null, "jobCompleteDate" : "1/15/2017", "totalTime" : "2", "managerNotes" : "job finished as" }
{ "_id" : ObjectId("5878274503f10eab7d3fbf8f"), "jobId" : "", "companyId" : 1001, "type" : "New Install", "startDate" : "1/15/2017", "endDate" : "1/15/2017", "startTime" : "2:00 PM", "description" : "This is new install", "instructions" : "This should be small job", "parts" : [ { "partNumber" : "AE0098123HG", "qty" : 11 }, { "partNumber" : "BE0098144HG", "qty" : 7 } ], "managerNotes" : "this is notes", "techAssignedId" : null, "jobCompleteDate" : "1/19/2017", "totalTime" : "8" }
{ "_id" : ObjectId("5878274503f10eab7d3fbf90"), "jobId" : "", "companyId" : 1000, "type" : "Checkup", "startDate" : "1/27/2017", "endDate" : "1/27/2017", "startTime" : "10:00 AM", "description" : "This is follow up to new install", "instructions" : "Quick review with small OEM swap", "parts" : [ { "partNumber" : "AE0098123HG", "qty" : 1 } ], "techAssignedId" : 1003, "jobCompleteDate" : null, "totalTime" : null, "managerNotes" : null }
{ "_id" : ObjectId("5878274503f10eab7d3fbf91"), "jobId" : "", "companyId" : 1000, "type" : "Maintenance", "startDate" : "2/21/2017", "endDate" : "2/21/2017", "startTime" : "7:00 AM", "description" : "Replace the filter", "instructions" : "Replace filter and and new clamp", "parts" : [ { "partNumber" : "SRG098143GFF", "qty" : 1 }, { "partNumber" : "BE0098144HG", "qty" : 2 } ] }
{ "_id" : ObjectId("587a4ba703f10eab7d3fbf93"), "jobId" : 10103, "companyId" : 1000, "type" : "Repair", "startDate" : "11/30/2016", "endDate" : "11/30/2016", "startTime" : "2:00 PM", "description" : "This is a fix to old company", "instructions" : "This should be repair job", "parts" : [ { "partNumber" : "AE0098123HG", "qty" : 11 }, { "partNumber" : "BE0098144HG", "qty" : 7 } ], "techAssignedId" : 1001, "jobCompleteDate" : "11/30/2016", "totalTime" : 5, "notes" : "under estimated total time", "managerNotes" : "estimation adjusted for next time" }
{ "_id" : ObjectId("587b9ebfcd346c75af4a6474"), "companyId" : 1003, "type" : "Repair", "startDate" : "1/27/2017", "endDate" : "1/27/2017", "description" : "fix the thing", "instructions" : "bring the tool to fix the thing", "parts" : [ { "partNumber" : "FE09821123HG", "qty" : "4" } ], "techAssignedId" : 1004, "jobCompleteDate" : null, "totalTime" : null, "jobId" : null, "managerNotes" : null }
{ "_id" : ObjectId("587bb699d6d5b5041dc8b024"), "companyId" : 1003, "type" : "Repair", "startDate" : "2/2/2017", "endDate" : "2/2/2017", "description" : "fix when part comes in", "techAssignedId" : 1002, "parts" : [ { "partNumber" : "WE7871HS8", "qty" : "1" } ] }
{ "_id" : ObjectId("588a94a915efd497201655d8"), "companyId" : 1001, "type" : "New Install", "startDate" : "1/27/2017", "endDate" : "1/27/2017", "description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\ncillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\nproident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "instructions" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\ncillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\nproident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "techAssignedId" : 1002, "parts" : [ { "partNumber" : "AE0098123HG", "qty" : "3" }, { "partNumber" : "FE09821123HG", "qty" : "4" } ] }
{ "_id" : ObjectId("588a950c15efd497201655d9"), "companyId" : 1002, "type" : "Repair", "startDate" : "1/27/2017", "endDate" : "1/27/2017", "description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\nconsequat. Duis aute irure dolor", "instructions" : "", "techAssignedId" : 1002, "parts" : [ { "partNumber" : "WE7871HS8", "qty" : "3" } ] }
{ "_id" : ObjectId("588a954d15efd497201655da"), "companyId" : 1004, "type" : "Maintenance", "startDate" : "1/27/2017", "endDate" : "1/27/2017", "description" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\nconsequat. Duis aute irure dolor", "techAssignedId" : 1002, "parts" : [ { "partNumber" : "AE0098123HG", "qty" : "3" }, { "partNumber" : "FE09821123HG", "qty" : "5" } ] }
{ "_id" : ObjectId("588aa5cfd0ab0c9a28338660"), "companyId" : 1005, "type" : "New Install", "startDate" : "1/27/2017", "endDate" : "1/27/2017", "description" : "ullamco laboris nisi ut aliquip ex ea commodo\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\ncillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\nproident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "techAssignedId" : 1004, "parts" : [ { "partNumber" : "WE7871HS8", "qty" : "1" } ] }
{ "_id" : ObjectId("588aa75dd0ab0c9a28338661"), "companyId" : 1006, "type" : "Maintenance", "startDate" : "1/27/2017", "endDate" : "1/27/2017", "description" : "ullamco laboris nisi ut aliquip ex ea commodo\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\ncillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\nproident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "instructions" : "ullamco laboris nisi ut aliquip ex ea commodo\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit ess", "techAssignedId" : 1004, "parts" : [ { "partNumber" : "AE0098123HG", "qty" : "2" }, { "partNumber" : "FE09821123HG", "qty" : "5" } ] }
{ "_id" : ObjectId("588aa785d0ab0c9a28338662"), "companyId" : 1007, "type" : "Repair", "startDate" : "1/27/2017", "endDate" : "1/27/2017", "description" : "ullamco laboris nisi ut aliquip ex ea commodo\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\ncillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\nproident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "techAssignedId" : 1003, "parts" : [ { "partNumber" : "WE7871HS8", "qty" : "5" }, { "partNumber" : "AE0098123HG", "qty" : "2" } ] }
> 
