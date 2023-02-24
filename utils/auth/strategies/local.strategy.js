const { Strategy } = require('passport-local');

const AuthService = require('./../../../services/auth.service');

const service = new AuthService();

const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
},async (email, password, done)=>{ // creamos una instancia de la estrategia
  try{
    const user = await service.getUser(email, password);
    done(null, user);  // le indicarmos el error como null y le pasamos el user
  }
  catch(error){
    done(error, false)  // le mandamos el error, con el false le indicamos que no fue posible encontrar el user
  }
});

module.exports = LocalStrategy;
