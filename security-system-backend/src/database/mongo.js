import mongoose from 'mongoose';
import { configuration } from '../configuration/configuration.js';

class Mongo {
    static connection() {
        if (!this.mongo) {
            this.mongo = mongoose.connect(configuration.mongo.connection_string,
                {useNewUrlParser: true, useUnifiedTopology: true});

            const db = mongoose.connection;
            db.once('open', () => {
                console.log('Database connected.');
            });

            db.on('error', err => {
                console.error('Connection error.');
            });
        }

        return this.mongo;
    }
}

export { Mongo };
