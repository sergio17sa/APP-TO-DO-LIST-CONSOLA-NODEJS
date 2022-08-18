const { v4: uudiv4 } = require('uuid');


class/* Creating a class called Tarea. */
 Tarea {

    constructor(desc) {
        this.id = uudiv4();
        this.desc = desc;
        this.completadoEn = null;
    }
}

module.exports = Tarea