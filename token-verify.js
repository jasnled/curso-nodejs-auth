const jwt = require('jsonwebtoken');

const secret = 'myCat';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY3NjMxNzM0Mn0.S8_-KOYDTmHaWxzcgeL7-eySFYDkVBviPZTVvmcs3zU';

function verifyToken (token, secret){
  return jwt.verify(token, secret)
};

const payload = verifyToken(token, secret);


console.log(payload);
