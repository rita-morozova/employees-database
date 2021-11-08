use Registration

db.createCollection('Registration', { capped: false });

db.Registration.insert([
{
  "id": 2,
  "firstName": "Lazar",
  "lastName": "Nayer",
  "email": "lnayer1@surveymonkey.com",
  "status": "Pending"
},
{
  "id": 1,
  "firstName": "Timmie",
  "lastName": "Oxshott",
  "email": "toxshott0@ucoz.com",
  "status": "Pending"
}
	
]);

 