use Registration

db.createCollection('Registartion', { capped: false });

db.Registartion.insert([
	{
  "id": 1,
  "firstName": "Timmie",
  "lastName": "Oxshott",
  "email": "toxshott0@ucoz.com",
  "status": "Pending"
}, {
  "id": 2,
  "firstName": "Lazar",
  "lastName": "Nayer",
  "email": "lnayer1@surveymonkey.com",
  "status": "Pending"
}, {
  "id": 3,
  "firstName": "Eduardo",
  "lastName": "Inkpin",
  "email": "einkpin2@gov.uk",
  "status": "Pending"
}
]);