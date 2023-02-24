const { Strategy, ExtractJwt } = require('passport-jwt');
// const boom = require('@hapi/boom');
// const bcrypt = require('bcrypt');
const {config} = require('./../../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),   //le indicamos de donde va a sacar el token
  secretOrKey: config.jwtSecret
};

const JwtStrategy = new Strategy(options, (payload, done)=>{
  try{
    return done(null, payload); //nos retorna el payload
  }catch(error){
    done(error, false)
  }

});

module.exports = JwtStrategy;
