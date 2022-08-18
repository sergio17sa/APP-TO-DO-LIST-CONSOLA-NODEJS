const Tarea = require('./tarea.js')
const colors = require('colors');


/* The class Tareas is a class that creates a new class Tarea and points to the property _listado of
Tareas. */


class Tareas {

    _listado = {};

    get listadoArr() {  // metodo del objeto que junto al setter permite acceder (get) o modificar (set) propiedades del mismo, 
        // se denominan propiedades computadas, permiten acceder a las propiedades de las clases sin descubrir su implementacion 

        const listado = [];

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado
    };


    constructor() {
        this._listado = {};
    }

   /* A method that takes an array of objects and adds them to the _listado property of the Tareas
   class. */
    cargarTareasFromArray(tareas = []) {
        tareas.forEach((ele) => {
            this._listado[ele.id] = ele;
        })
    };


  /* Creating a new class Tarea and pointing to the property _listado of Tareas. */
    crearTarea(desc = '') {     //metodo de la clase Tareas que crea una nuava clase Tarea y apunta a la propiedad _listado de Tareas 
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea
    };


  /* A function that is listing the tasks in the array. */
    listarTareas() {

        console.log("\n")

        this.listadoArr.forEach(({ desc, completadoEn }, index) => {
            const i = `${index + 1}`.green
            console.log(` ${i}. ${desc} :: ${completadoEn === null ? "Pendiente".red : "Compeltado".green} `)

        })

        console.log("\n")
    };


    /* Printing out the tasks that are completed or pending. */
    tareasPendientesCompletadas(completadas = true) {

        console.log("\n")

        let cont = 1;
        this.listadoArr.forEach(({ desc, completadoEn }) => {

            const estado = completadoEn !== null ? "Completado".green : "pendiente".red

            if (completadas) {

                if (completadoEn) {
                    console.log(`${cont++}. ${desc} :: ${completadoEn} `)
                }

            } else {

                if (!completadoEn) {
                    console.log(`${cont++}. ${desc} :: ${estado} `)
                }
            }
        })
        console.log("\n")
    };


    /* Deleting the task with the id that is passed as a parameter. */
    eliminarTarea(id = "") {

        if (this._listado[id]) {
            delete this._listado[id]
        }
    };


   /* Toggling the completion of the tasks. */
    toggleCompletadas(ids = []) {

        ids.forEach(id => {

            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toDateString()
            }

        });

        this.listadoArr.forEach(tarea => {

            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null
            }

        })

    }


};

module.exports = Tareas