const Mongoose = require('mongoose');

class DataModeler {

    constructor() {

    }

    async createModel(mongoose, table, schema) {
        const dataSchema = new Mongoose.Schema(schema);
        let model;
        try {
            model = mongoose.model(table)
        } catch(err) {
            model = mongoose.model(table, dataSchema)
        }
        return model;
    }

}

module.exports = DataModeler;