db.createUser({
    user: 'user', 
    pwd: 'user', 
    roles: [
        { role: 'dbOwner', 
        db: 'Employee' }
    ] 
});

db = new Mongo().getDB("Employee");

db.createCollection('employee', { capped: false });

db.employee.insert([
	{"userId": "111", "firstName": "Joe", "lastName": "Doe", "address": "555 Cherry St", "city": "Seattle", "state": "WA", "zip": "90412", "cellPhone": "60987435623", "email": "joe@mail.com"},
	{"userId": "222", "firstName": "Joe", "lastName": "Notdoe", "address": "777 Cherry St", "city": "Seattle", "state": "WA", "zip": "90412", "cellPhone": "3333333333", "email": "joedoe@mail.com"},
	{"userId": "333", "firstName": "Ann", "lastName": "Doe", "address": "555 Cherry St", "city": "Seattle", "state": "WA", "zip": "90412", "cellPhone": "111111111", "email": "ann@mail.com"}
]);