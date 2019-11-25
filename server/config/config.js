//
//Puerto
//
process.env.PORT = process.env.PORT || 3000;

//
//Entorno
//
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//
//Vencimiento del token
//60 seg *  60 min * 24 horas * 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24;


//
//Seed de autenticacion
//
process.env.SEED = 'este-es-el-seed-desarrollo';


//
//Base de datos
//

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/traminator';
} else {
    urlDB = 'mongodb+srv://gamax:iGPtf1mfGhvyZR0c@cluster0-yzvfc.mongodb.net/traminator';
}
process.env.URLDB = urlDB;