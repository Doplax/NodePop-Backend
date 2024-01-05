// modulo que exporta un middleware que controla si estamos logrados o no


module.exports = (req, res, next) => {
    // Si el cliente que hace la petición, no tiene en su sesión la variable usuarioLogado
        // Le mandamosal login porque no le conocemos
        if (!req.session.usuarioLogado) {
            res.redirect('./login')
            return;
        }

        next(); // Para que continue sin hacer nada
}