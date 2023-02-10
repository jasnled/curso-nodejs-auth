const bcrypt = require('bcrypt');


async function hashPassword(){

  const myPassword = 'admin 123 .202' // suponiendo que esta sea nuestra contrasena
  const hash = await bcrypt.hash(myPassword, 10); // toma el password y lo encripta la
  // cantidad de veces indicado
  console.log(hash);

};


hashPassword();
