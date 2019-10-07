import ItemRepository from '../ItemRepository';
import * as Datastore from 'nedb';
import * as path from 'path';

describe('Item Repository test', () => {
    let itemRepository: ItemRepository | null = null;
    const db = new Datastore({
        filename: path.resolve('./packages/theworld-core/test/simple-item.db'),
        autoload: true,
    });
    beforeEach(() => {
        itemRepository = new ItemRepository(db);
    });

    describe('#init item db', () => {
        it('should add item', () => {
            console.log(db);
            itemRepository.addItem({
                id: 'bad_apple',
                name: '坏掉的苹果',
                meta: {
                    hello: 'item',
                },
                description: '坏掉的苹果，可少量回复生命值',
                // Array of body part
                equipable: [],
                template_id: null
        
            });
        });
    });
});
