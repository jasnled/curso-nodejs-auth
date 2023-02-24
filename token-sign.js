const jwt = require('jsonwebtoken');

const secret = 'myCat';  //secret realmente debe de ir en un archivo .env

const payload = {
  sub: 1,   /// la forma en la que vamos a identificar el usuario
  role: 'customer'
};

function signToken (payload, secret){
  return jwt.sign(payload, secret);
};

const token = signToken(payload, secret);

console.log(token);
