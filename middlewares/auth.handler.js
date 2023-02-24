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
function checkAdminRole(req,res,next){
  const user = req.user;
  if(user.role === 'admin'){
    next();
  }else{
    next(boom.unauthorized());
  }
}

function checkRoles(...roles){
  return (req,res, next) => {
    const user = req.user;
    if (roles.includes(user.role)){
      next();
    }else{
      next(boom.unauthorized());
    }
  }
}



module.exports = { checkApiKey, checkAdminRole, checkRoles }
