
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const UserService = require('./../services/user.service');
const service = new UserService();
const { config } = require('./../config/config');


class AuthService {


  async getUser (email, password){
    const user = await service.findByEmail(email);     //le pasamos el username, email, una
                                                     //en la que nos indicara si fue realizado o no
    if(!user){
      throw boom.unauthorized();  //si email no fue encontrado lanzamos un error ya que user sera null
    };
    const isMatch = await bcrypt.compare(password, user.password); // para hacer comprobar si coinciden los passwords
    if(!isMatch){
      throw boom.unauthorized();
    };
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }

  async signToken (user){
    const payload = {
      sub: user.id,
      role: user.role
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return{ user,token };
  }

  async sendRecovery(email){
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    };
    const payload = {
      sub: user.id,  // para generar el token con el id del user
    };
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const  link = `http://myfrontend.com/recovery?token=${token}`;
    await service.update(user.id, {recoveryToken: token});
    const mail = {
      from: config.userMailer, //sender address
      to: user.email, // list of receivers
      subject: "Email para recuperar contraseña ✔", // Subject line
      html: `<b>Ingresa a este link => ${link}</b>` // html body
    };
    const rta = await this.sendMail(mail);
    return rta;
  };

  async sendMail(infoMail) {     // async..await is not allowed in global scope, must use a wrapper

    // create reusable transporter object using the default SMTP transport
    const  transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",// el servidor que se utilizara es el de gmail el cual si es seguro
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.userMailer, // generated ethereal user
        pass: config.passMailer // password generado por el google
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail(infoMail);
    return { message: 'mail sent' }
  };

  async changePassword( token, newPassword ){
    try {
      const payload = jwt.verify(token, config.jwtSecret); // al verificar, generaremos el payload donde el sub contiene el user.id
      const user = await service.findOne(payload.sub); //
      if (user.recoveryToken !== token) { // verificamos que el token el que esta vigente
         throw boom.unauthorized();
      };
      const hash = await bcrypt.hash( newPassword, 10 ); // generamos el hash para imprimirlo en base de datos
      await service.update(user.id, {recoveryToken: null, password: hash}); //imprimimos el newPassword en base de datos y signamos null al token
      return { message: 'password changed' }
    } catch(error) {
     throw boom.unauthorized();
    }
  }

}

module.exports = AuthService;
