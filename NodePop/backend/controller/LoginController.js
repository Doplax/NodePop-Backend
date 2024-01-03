const Usuario = require('../models/Usuario'); // NO existe

class LoginController {
    index(req, res, next) {
        req.locals.error = '';
        res.render('login');
    }

    async post(req, res, next){
        try{
            const {email, password} = req.body;

            // Find user in DB
            const usuario = await Usuario.findOne({email: email});

            // Si no lo encuentro o la contraseña no coincide --> error
            if (!uauario || usuario.password !== password) {
                res.locals.error = req.__('Invalid Credentials');
                res.render('index');
                return
            }

            // Si extiste y la contraseña coincide ==> Zona privada
            res.redirect('/privado');
            
        } catch(err){

        }
    }
}