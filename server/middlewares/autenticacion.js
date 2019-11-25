const jwt = require('jsonwebtoken');

// verificar token
let verificaToken = (req, res, next) => {
    let token = req.get('token');
    /*res.json({
        token: token
    });*/
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }


        req.usuario = decoded.usuario; //obtengo el usuario del token decodificado
        next();

    });
}

//verifica rol admin
let verificaAdmin_role = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'el usuario no es administrador'
            }
        });
    }
}



module.exports = {
    verificaToken,
    verificaAdmin_role
}