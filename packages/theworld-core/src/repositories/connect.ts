import * as Datastore from 'nedb';

type TheWorldDB = {
    items?: Datastore;
    creatures?: Datastore;
    areas?: Datastore;
};

const db: TheWorldDB = {
    items: null,
    creatures: null,
    areas: null,
};
db.items = new Datastore({ filename: './items.db', autoload: true });

db.creatures = new Datastore({ filename: './creatures.db', autoload: true });

db.areas = new Datastore({ filename: './areas.db', autoload: true });

export { db };
