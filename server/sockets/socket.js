const { io } = require('../server');


io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });



    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('enviarMensaje', (data, callback) => {

        console.log(data);
        // esto sirve para emitir a todos los usuarios
        //        let enJson = JSON.parse(data);

        client.broadcast.emit('enviarMensaje', data);
        //client.broadcast.emit('enviarMensaje', enJson);

        // if (mensaje.usuario) {
        //     callback({
        //         resp: 'TODO SALIO BIEN!'
        //     });

        // } else {
        //     callback({
        //         resp: 'TODO SALIO MAL!!!!!!!!'
        //     });
        // }



    });

    // Escuchar el cliente
    client.on('recibirCoordenadas', (data, callback) => {

        console.log(data);
        //let enJson = JSON.parse(data);
        // esto sirve para emitir a todos los usuarios
        client.broadcast.emit('recibirCoordenadas', data);



    });

});