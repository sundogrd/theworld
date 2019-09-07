import Item from "./Item";
import { ItemDoc, InventoryDoc } from "../docs";
import Inventory from "./Inventory";

class ContainerItem extends Item {
    lockedBy: string;
    closeable: boolean;
    closed: boolean;
    locked: boolean;
    maxItems: number;
    inventory: Inventory; // inventory
    constructor(itemDoc: ItemDoc) {
        super(itemDoc)
        this.maxItems = itemDoc.maxItems || Infinity;

        if(itemDoc.inventory) {
            this.inventory = new Inventory(itemDoc.inventory)
        } else {
            this.initializeInventory(this.maxItems);
        }

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
        this.inventory.addItem(item);
        item.carriedBy = this.id;
    }

    removeItem(item: Item): void {
        this.inventory.removeItem(item);
        item.carriedBy = null;
    }

    isInventoryFull(): boolean {
        return this.inventory.isFull;
    }
}


export default ContainerItem
