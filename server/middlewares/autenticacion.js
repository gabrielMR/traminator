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


module.exports = {
    verificaToken
}