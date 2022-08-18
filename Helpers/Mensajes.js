const colors = require('colors');
const { resolve } = require('path');



/**
 * It returns a promise that resolves to the user's input.
 */
const mostrarMenu = () => {

    return new Promise((resolve => {

        console.clear();
        console.log('========================='.green);
        console.log('       Mostrar Menu        '.green);
        console.log('=========================\n'.green);

        console.log(`${'1.'.green} Crear Tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar tarea`);
        console.log(`${'0.'.green} Salir\n`);

        const readLine = require('readline').createInterface({ // estamos creando la interfaz que se va a utilizar para mostrar 
            // y recibir información del usuario 

            input: process.stdin, // vamos a tener que esperar una respuesta del usuario
            output: process.stdout, // mostrar msg en consola cuando pido informacion al usuario
        });

        readLine.question('Seleccione una opción', (opt) => { // .question la utilizamos para llamar al stdaout y 
            //mostrarle informarcion de la pregunta al usuario

            readLine.close();
            return resolve(opt);

        })
    }))
};


/**
 * It creates a new promise that waits for the user to press enter, and then resolves the promise.
 * @returns A promise.
 */

const pausa = () => {

    const promesa = new Promise((resolve => {

        const readLine = require('readline').createInterface({ // estamos creando la interfaz que se va a utilizar para mostrar 
            // y recibir información del usuario 
            input: process.stdin, // vamos a tener que esperar una respuesta del usuario
            output: process.stdout, // mostrar msg en consola cuando pido informacion al usuario
        });

        readLine.question(`\nPresione ${'enter'.green} para continuar`, (opt) => { // .question la utilizamos para llamar al stdaout y 
            // mostrarle informarcion de la pregunta al usuario
            readLine.close();
            resolve()
        });

    }))

    return promesa;

};

module.exports = {
    mostrarMenu,
    pausa,
};