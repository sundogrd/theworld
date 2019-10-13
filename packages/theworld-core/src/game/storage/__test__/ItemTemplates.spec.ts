import ItemTemplateRepository from '../ItemTemplateRepository';
import * as Datastore from 'nedb';
import * as path from 'path';

describe('Item Repository test', () => {
    let itemTemplateRepository: ItemTemplateRepository | null = null;
    const db = new Datastore({
        filename: path.resolve('./packages/theworld-core/test/simple-item-template.db'),
        autoload: true,
    });
    beforeEach(() => {
        itemTemplateRepository = new ItemTemplateRepository(db);
    });

    describe('#init item db', () => {
        it('should add item template', () => {
            console.log(db);
            itemTemplateRepository.addItemTemplate({
                id: 'bad_apple_tpl',
                name: '坏掉的苹果',
                createScript: `function () {
                    {
                        id: 'bad_apple',
                        name: '坏掉的苹果',
                        meta: {
                            hello: 'item',
                        },
                        description: '坏掉的苹果，可少量回复生命值',
                        equipable: [],
                        template_id: 'bad_apple_tpl'
                    }
                }`
            });
        });
    });
});
