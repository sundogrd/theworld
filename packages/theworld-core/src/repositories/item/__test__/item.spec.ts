import * as assert from 'assert';
import * as Datastore from 'nedb';
import Item from '../Item';
import { EItemType } from '@/repositories/docs';
import ItemRepository from '../ItemRepository';

describe('Basic Attribute', () => {
    let book: null | Item = null; // simple object: book
    const bag = null; // simple container: bag
    const testStore = new Datastore({});
    const testRepository = new ItemRepository(testStore);

    beforeEach(() => {
        book = new Item({
            keywords: ['test'],
            name: 'book',
            id: 'book_' + Math.floor(Math.random() * 100),
            metadata: {},
            // behaviors?: any;
            description: 'item for test',
            template: 'book', // template id
            isEquipped: false,
            type: EItemType.OBJECT,
            // carriedBy?: string; // entity id
            // script?: string
            // equippedBy?: string; // entity id

            // container
            // maxItems?: number
            // lockedBy?: string;
            // closeable?: boolean;
            // closed?: boolean;
            // locked?: boolean;
            // inventory?: InventoryDoc;
        });
    });

    describe('#syncItem', () => {
        it('should sync item to store', async (done: any) => {
            await testRepository.syncItem(book);
            console.log(testRepository.getItemByID(book.id));
            done();
        });

        // it('should not allow negative base', () => {
        //   attribute.setBase(-100);
        //   assert.equal(attribute.base, 0);
        // });
    });

    // describe('#lower', () => {
    //   it('should lower delta', () => {
    //     attribute.lower(5);
    //     assert.equal(attribute.delta, -5);
    //   });
    // });

    // describe('#raise', () => {
    //   it('should raise delta', () => {
    //     attribute.lower(5);
    //     attribute.raise(2);
    //     assert.equal(attribute.delta, -3);
    //   });

    //   it('should not allow raising delta above 0', () => {
    //     attribute.lower(10);
    //     assert.equal(attribute.delta, -10);
    //     attribute.raise(100);
    //     assert.equal(attribute.delta, 0);
    //   });
    // });
});
