const inquirer = require('inquirer');
const colors = require('colors');


/* Creating a list of choices for the user to choose from. */
const questions = [{

    type: 'list',
    name: 'option',
    message: '¿Que desea hacer?',
    choices: [

        {
            value: '1',
            name: `${'1.'.green} Crear Tarea`
        },
        {
            value: '2',
            name: `${'2.'.green} Listar tareas`,
        },
        {
            value: '3',
            name: `${'3.'.green} Listar tareas completadas`
        },
        {
            value: '4',
            name: `${'4.'.green} Listar tareas pendientes`
        },
        {
            value: '5',
            name: `${'5.'.green} Completar tarea(s)`
        },
        {
            value: '6',
            name: `${'6.'.green} Borrar tarea`
        },
        {
            value: '0',
            name: `${'0.'.green} Salir\n`
        },
    ]
}];


/**
 * It's a function that returns a promise that resolves to the value of the option property of the
 * object returned by the inquirer.prompt function.
 * @returns The option that the user selects.
 */
const inquirerMenu = async () => {

    console.clear();
    console.log('========================='.green);
    console.log('       Mostrar Menu        '.green);
    console.log('=========================\n'.green);

    const { option } = await inquirer.prompt(questions);

    return option;
};



const pause_option = [{

    type: 'input',
    name: 'pause',
    message: `Presione ${'enter'.green} para continuar`,

}]


/**
 * The function pausa() is an async function that returns a promise. The promise is the result of the
 * inquirer.prompt() function, which is a function that returns a promise. The inquirer.prompt()
 * function is passed the pause_option object, which is an object that contains a question and a name
 * property. The question property is an object that contains a type property, which is a string, and a
 * message property, which is a string. The name property is a string.
 * @returns The pause function is returning the pause object.
 */
const pausa = async () => {

    const pause = await inquirer.prompt(pause_option);
    return pause;

};

/**
 * A function that asks the user to enter a value.
 * @param message - The message to display to the user.
 * @returns The question object is being returned.
 */
const leerInput = async (message) => {

    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Por favor Ingrese un valor'
            }
            return true
        }
    }]

    const { desc } = await inquirer.prompt(question);
    return desc   // inquirer devuelve un objeto {name: input ingresado} ------------> {desc: tarea creada}    
};


/**
 * It takes an array of objects, and returns a list of choices for the user to select from.
 * @param [tareas] - an array of objects
 * @returns The id of the task to be deleted.
 */
const listarTareasBorrar = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`
        return {
            value: tarea.id,
            name: `${idx.green} ${tarea.desc}`
        }
    })

    const questions = [{
        type: 'list',
        name: 'id',
        message: 'BORRAR TAREA'.red,
        choices
    }];

    choices.unshift({
        value: "0",
        name: `${'0'.green} Cancelar`
    })

    const { id } = await inquirer.prompt(questions)
    return id

};


/**
 * It asks the user a question and returns a boolean value based on the user's answer.
 * @param [message] - The message to display to the user.
 * @returns The value of the key 'ok' from the object returned by the function.
 */
const confirmarBorrado = async (message = "") => {

    const question = [{
        type: 'confirm',
        name: 'ok',
        message,

    }]

    const { ok } = await inquirer.prompt(question)
    return ok

}

/**
 * It takes an array of objects, and returns an array of objects.
 * @param [tareas] - An array of objects. Each object has an id, desc, and completadoEn property.
 * @returns An array of ids.
 */
const listadoCheckList = async (tareas = []) => {


    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`
        return {
            value: tarea.id,
            name: `${idx.green} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const questions = [{
        type: 'checkbox',
        name: 'ids',
        message: 'SELECCIONES'.red,
        choices
    }];


    const { ids } = await inquirer.prompt(questions)
    return ids

};



module.exports = {

    inquirerMenu,
    pausa,
    leerInput,
    listarTareasBorrar,
    confirmarBorrado,
    listadoCheckList

};