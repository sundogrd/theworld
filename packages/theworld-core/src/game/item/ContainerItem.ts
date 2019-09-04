import Item, { ItemData } from './Item'
import GameEntity from '../GameEntity';
import { Inventory } from '../Inventory';

type ContainerItemData = {
    maxItems: number;
} & ItemData

class ContainerItem extends Item {
    lockedBy: GameEntity
    closeable: boolean;
    closed: boolean;
    locked: boolean;
    maxItems: number;
    inventory: Inventory;
    constructor(item: ContainerItemData) {
        super(item)
        this.maxItems    = item.maxItems || Infinity;

        this.initializeInventory(this.maxItems);
    }
    /**
   * Open a container-like object
   */
    open(): void {
        if (!this.closed) {
            return;
        }

        this.closed = false;
    }

    /**
   * Close a container-like object
   */
    close(): void {
        if (this.closed || !this.closeable) {
            return;
        }

        this.closed = true;
    }

    /**
   * Lock a container-like object
   */
    lock(): void {
        if (this.locked || !this.closeable) {
            return;
        }

        this.close();
        this.locked = true;
    }

    /**
   * Unlock a container-like object
   */
    unlock(): void {
        if (!this.locked) {
            return;
        }

        this.locked = false;
    }

    /**
     * Create an Inventory object from a serialized inventory
     * @param {object} inventory Serialized inventory
     */
    initializeInventory(maxItems: number): void {
        this.inventory = new Inventory();
        this.inventory.setMax(maxItems);
    }

    addItem(item: Item): void {
        this._setupInventory();
        this.inventory.addItem(item);
        item.carriedBy = this.id;
    }

    removeItem(item: Item): void {
        this.inventory.removeItem(item);
        item.carriedBy = null;
    }

    isInventoryFull(): boolean {
        this._setupInventory();
        return this.inventory.isFull;
    }

    _setupInventory(): void {
        if (!this.inventory) {
            this.inventory = new Inventory({
                items: [],
                max: this.maxItems
            });
        }
    }
}


export default ContainerItem
