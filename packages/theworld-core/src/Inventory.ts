'use strict';

type InventoryData = {
    items: Array<Item>,
    max: number,
}

/**
 * Representation of a `Character` or container `Item` inventory
 * @extends Map
 */
class Inventory extends Map {
    maxSize: number;
  /**
   * @param {object} init
   * @param {Array<Item>} init.items
   * @param {number} init.max Max number of items this inventory can hold
   */
  constructor(init?: InventoryData) {
    const defaultInit = {
        items: [],
        max: Infinity
    }
    init = {
        ...defaultInit,
        ...init,

    }

    super(init.items);
    this.maxSize = init.max;
  }

  setMax(size: number) {
    this.maxSize = size;
  }

  getMax() {
    return this.maxSize;
  }

  /**
   * @return {boolean}
   */
  get isFull() {
    return this.size >= this.maxSize;
  }

  /**
   * @param {Item} item
   */
  addItem(item: Item) {
    if (this.isFull) {
      throw new InventoryFullError();
    }
    this.set(item.uuid, item);
  }

  /**
   * @param {Item} item
   */
  removeItem(item) {
    this.delete(item.uuid);
  }

  serialize() {
    // Item is imported here to prevent circular dependency with Item having an Inventory
    const Item = require('./Item');

    let data = {
      items: [],
      max: this.maxSize
    };

    for (const [uuid, item] of this) {
      if (!(item instanceof Item)) {
        this.delete(uuid);
        continue;
      }

      data.items.push([uuid, item.serialize()]);
    }

    return data;
  }

  /**
   * @param {GameState} state
   * @param {Character|Item} carriedBy
   */
  hydrate(state: GameState, carriedBy: Character | Item) {
    // Item is imported here to prevent circular dependency with Item having an Inventory
    const Item = require('./Item');

    for (const [uuid, def] of this) {
      if (def instanceof Item) {
        def.carriedBy = carriedBy;
        continue;
      }

      if (!def.entityReference) {
        continue;
      }

      const area = state.AreaManager.getAreaByReference(def.entityReference);
      let newItem = state.ItemFactory.create(area, def.entityReference);
      newItem.uuid = uuid;
      newItem.carriedBy = carriedBy;
      newItem.initializeInventory(def.inventory);
      newItem.hydrate(state, def);
      this.set(uuid, newItem);
      state.ItemManager.add(newItem);
    }
  }
}

/**
 * @extends Error
 */
class InventoryFullError extends Error {}

export {
    Inventory,
    InventoryFullError
}
