const express = require('express');
const passport = require('passport');
const AuthService = require('./../services/auth.service');
const validatorHandler = require('./../middlewares/validator.handler');

const {recoveryPasswordSchema,changePasswordSchema, loginSchema}= require('./../schemas/auth.schema');


const router = express.Router();
const service = new AuthService();


router.post('/login',
  validatorHandler(loginSchema, 'body'),
  passport.authenticate('local', { session: false }), //como si fuese un middleware le indicamos que por el momento no queremos sesiones
  async (req, res, next) => {  //el req es lo que me devuelve el middleware anterior
    try {
      const user = req.user;
      const token = await service.signToken(user);
      console.log(token);
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }
);


router.post('/recovery',
  validatorHandler(recoveryPasswordSchema, 'body'),
  async (req,res,next) => {
    try{
      const { email } = req.body;
      const rta = await service.sendRecovery(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
)

router.post('/change-password',
  validatorHandler(changePasswordSchema, 'body'),
  async(req, res, next) => {
    try{

      const { token, newPassword } = req.body;
      const rta = await service.changePassword( token, newPassword );
      res.json(rta);

    }catch(error){
      next(error);
    }
  }
);
module.exports = router;
