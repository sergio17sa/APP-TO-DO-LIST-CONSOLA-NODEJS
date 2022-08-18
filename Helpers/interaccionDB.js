const fs = require('fs');
const path = ('./dataBase/tarea.json')


/**
 * The function guardarTarea takes a parameter called tarea, and then writes the contents of the tarea
 * parameter to a file called path.
 * @param tarea - The task to be saved.
 */
const guardarTarea = (tarea) => {

    fs.writeFileSync(path, JSON.stringify(tarea))

};

/**
 * It reads the file and returns the data in the file.
 * @returns the value of the variable jsonTareaEnDb.
 */
const leerTareas = () => {

    if (!fs.existsSync(path)) {
        return null;
    }

    const tareaEnDb = fs.readFileSync(path, { encoding: 'utf-8' });

    const jsonTareaEnDb = JSON.parse(tareaEnDb)

    return jsonTareaEnDb

};

module.exports = {
    guardarTarea,
    leerTareas
};