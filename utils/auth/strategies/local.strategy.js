const boom = require('@hapi/boom');
const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');

const UserService = require('../../../services/user.service');

const service = new UserService();

const LocalStrategy = new Strategy(async (email, password, done)=>{ // creamos una instancia de la estrategia
  try{
    const user = await service.findByEmail(email);     //le pasamos el username, email, una
                                                     //en la que nos indicara si fue realizado o no

    if(!user){
      done(boom.unauthorized(), false);   //si email no fue encontrado lanzamos un error ya que user sera null
    };
    const isMatch = bcrypt(password, user.password); // para hacer comprobar si coinciden los passwords
    if(!isMatch){
      done(boom.unauthorized());
    };
    done(null, user);  // le indicarmos el error como null y le pasamos el user
  }
  catch(error){
    done(error, false)  // le mandamos el error, con el false le indicamos que no fue posible encontrar el user
  }
});
module.exports = LocalStrategy;
