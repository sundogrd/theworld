import { InventoryDoc } from "./docs";
import Item from "./item/Item";

/**
 * @extends Error
 */
export class InventoryFullError extends Error {}

/**
 * Representation of a `Character` or container `Item` inventory
 * @extends Map
 */
class Inventory extends Array {
    maxSize: number;
    /**
   * @param {object} init
   * @param {Array<Item>} init.items
   * @param {number} init.max Max number of items this inventory can hold
   */
    constructor(doc?: InventoryDoc) {
        super()
        this.maxSize = doc.maxItems;
        for(const itemId of doc.itemIds) {
            this.push(itemId)
        }
    }

    setMax(size: number): void {
        this.maxSize = size;
    }

    getMax(): number {
        return this.maxSize;
    }

    get size(): number {
        return this.length
    }

    /**
   * @return {boolean}
   */
    get isFull(): boolean {
        return this.size >= this.maxSize;
    }

    /**
   * @param {Item} item
   */
    addItem(item: Item): void {
        if (this.isFull) {
            throw new InventoryFullError();
        }
        this.push(item.id);
    }

    /**
   * @param {Item} item
   */
    removeItem(item: Item): void {
        const itemIndex = this.findIndex((itemId: string) => itemId === item.id)
        this.splice(itemIndex, 1)
    }
}

export default Inventory
