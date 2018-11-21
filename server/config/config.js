/**
 * Archivo de configuración
 * Cúando se inicia el server.js, lo primero que se hace es un require de este archivo para que se ejecute y haga todas las configuraciones.
 * El 'process' es una variable global, con lo cual se puede acceder, desde cualquier punto de la apliacción sin tener que hacer un require.
 * La propiedad 'process.env' devuelve un objeto con los datos del entorno de la aplicación, podemos añadir dentro todo lo que queramos para tenerlo disponible de forma global.
 * Cuando despleguemos la aplicación en alguna plataforma como Heroku, podemos configurar Heroku para que tenga las variables que queramos en ese entorno, 
 * como por ejemplo PORT, SEED, ENV, etc...
 * Cuando se ejecuta este archivo, comprueba esas variables, en caso de que no existan les da el valor que pongamos aqui despues de ||
 */



/**
 * ===================================
 * Puerto
 * ===================================
 */
process.env.PORT = process.env.PORT || 3000;

//===================================
//  Entorno
//===================================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//===================================
//  Vencimiento del token
//===================================
process.env.CADUCIDAD_TOKEN = '1h';

//===================================
//  SEED de autenticación
//===================================
process.env.SEED = process.env.SEED || "este-es-el-seed-de-desarrollo";