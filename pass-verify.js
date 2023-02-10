const bcrypt = require('bcrypt');


async function verifyPassword(){
  const hashGenerated = '$2b$10$yKTGOASAl3lVnUbiKlCZYuHYaPg.wUzHQEEWyOr85V4eA2LkQduXW';
  const myPassword = 'admin 123 .202' // suponiendo que esta sea nuestra contrasena
  const isMatch = await bcrypt.compare(myPassword, hashGenerated); // toma el password y lo encripta la
  // cantidad de veces indicado
  console.log(isMatch);

};

verifyPassword();
