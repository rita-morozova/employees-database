use Login

db.createCollection('Login', { capped: false });

db.Login.insert([
	{"email": "joe@mail.com", "password": "$2a$12$FdMWB4g5VWIgImVbhRbuAOmlTUiCe0izsX.CjhnoBwTgJgye9mKt6"},
        {"email": "joedoe@mail.com", "password": "$2a$12$FdMWB4g5VWIgImVbhRbuAOmlTUiCe0izsX.CjhnoBwTgJgye9mKt6"},
	{"email": "ann@mail.com", "password": "$2a$12$FdMWB4g5VWIgImVbhRbuAOmlTUiCe0izsX.CjhnoBwTgJgye9mKt6"}
]);