const boom = require('@hapi/boom');
const { config } = require('../config/config');

function checkApiKey(req, res, next){

  const apiKey = req.headers['api']; //de los header obtendremos algo llamado api
  if ( apiKey == config.apiKey ){  //siapiKey es 123 entonces para la etapa de verificacion
    next();
  } else { //si no lanzamos un error
    next(boom.unauthorized());
  }

}

module.exports = { checkApiKey }
