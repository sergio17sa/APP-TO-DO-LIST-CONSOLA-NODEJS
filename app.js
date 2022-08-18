const colors = require('colors');
const { guardarTarea, leerTareas } = require('./Helpers/interaccionDB');
const {
   inquirerMenu,
   pausa,
   leerInput,
   listarTareasBorrar,
   confirmarBorrado,
   listadoCheckList
} = require('./Helpers/inquirer');
const Tareas = require('./models/tareas');
const fs = require('fs');





/**
 * Main() is an async function that calls a series of other functions, each of which returns a promise
 */
const main = async () => {

   console.clear();

   let opt = '';

   const tareas = new Tareas()

   const tareasDB = leerTareas();

   if (tareasDB) {
      tareas.cargarTareasFromArray(tareasDB)
   }

   do {

      opt = await inquirerMenu();

      switch (opt) {

         case "1":

            //  crear opcion (tarea)
            let desc_tarea = await leerInput('descripción: ')
            console.log(desc_tarea)
            tareas.crearTarea(desc_tarea)
            break;

         case "2":

            // listar todas las tareas
            tareas.listarTareas();
            break;

         case "3":
            // Listar tareas completadas 

            tareas.tareasPendientesCompletadas(true);
            break;

         case "4":
            // Listar tareas pendientes 

            tareas.tareasPendientesCompletadas(false);
            break;

         case "5":
            //Listar y completar tareas 

            const ids = await listadoCheckList(tareas.listadoArr)
            tareas.toggleCompletadas(ids)
            console.log(ids)
            break;

         case "6":
            //borrar tareas

            console.log("\n")
            // Listar tareas a borrar 
            const id = await listarTareasBorrar(tareas.listadoArr)
            if (id !== "0") {
               console.log({ id })
               const ok = await confirmarBorrado("Estás seguro de borrar esta tarea")
               if (ok) {
                  tareas.eliminarTarea(id)
                  console.log("Tarea Borrada correctamente")
               }
            }
      }

      guardarTarea(tareas.listadoArr)

      if (opt !== '0') await pausa();

   } while (opt !== '0');
};

main()




