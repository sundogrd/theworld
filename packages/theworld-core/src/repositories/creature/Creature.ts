import Metadatable from '@/game/Metadatable';
import { EventEmitter } from 'events';
import Inventory, { InventoryFullError } from '../Inventory';
import { CreatureDoc } from '../docs';
import Item from '../item/Item';

class EquipSlotTakenError extends Error {}
class EquipAlreadyEquippedError extends Error {}

export enum ECreatureType {
    NPC = 'npc',
    MONSTER = 'monster',
    PLAYER = 'player',
}

/**
 * The Character class acts as the base for both NPCs and Players.
 *
 * @property {string}     name       Name shown on look/who/login
 * @property {Inventory}  inventory
 * @property {Set}        combatants Enemies this character is currently in combat with
 * @property {number}     level
 * @property {Attributes} attributes
 * @property {EffectList} effects    List of current effects applied to the character
 * @property {Room}       room       Room the character is currently in
 *
 * @extends EventEmitter
 * @mixes Metadatable
 */
class Creature extends Metadatable(EventEmitter) {
    id: string;
    name: string;
    type: ECreatureType;
    inventory: Inventory;
    equipment: any;
    combatants: Set<string>; // creature ids
    combatData: {};
    level: number;
    position: {
        room: string; // room id
        x: number;
        y: number;
        z: number;
    };
    attributes: any;
    followers: Set<string>; // creature ids
    following?: string;
    party?: any;
    effects: any;
    metadata: Record<string, any>;
    constructor(data: CreatureDoc) {
        super();
        this.id = data.id;
        this.name = data.name;
        this.inventory = new Inventory(data.inventory);
        // this.equipment = data.equipment || new Map();
        // this.combatants = new Set();
        // this.combatData = {};
        this.level = data.level || 1;
        this.position = data.position;
        // this.attributes = data.attributes || new Attributes();

        this.followers = data.followers;
        this.following = data.following;
        this.party = data.party;

        // this.effects = new EffectList(this, data.effects);

        // Arbitrary data bundles are free to shove whatever they want in
        // WARNING: values must be JSON.stringify-able
        if (data.metadata) {
            this.metadata = data.metadata;
        } else {
            this.metadata = {};
        }
    }

    /**
     * Proxy all events on the player to effects
     * @param {string} event
     * @param {...*}   args
     */
    emit(event: string, ...args: any) {
        super.emit(event, ...args);

        return this.effects.emit(event, ...args);
    }

    // /**
    //  * @param {string} attr Attribute name
    //  * @return {boolean}
    //  */
    // hasAttribute(attr) {
    //   return this.attributes.has(attr);
    // }

    /**
     * Get current maximum value of attribute (as modified by effects.)
     * @param {string} attr
     * @return {number}
     */
    // getMaxAttribute(attr) {
    //   if (!this.hasAttribute(attr)) {
    //     throw new RangeError(`Character does not have attribute [${attr}]`);
    //   }

    //   const attribute = this.attributes.get(attr);
    //   const currentVal = this.effects.evaluateAttribute(attribute);

    //   if (!attribute.formula) {
    //     return currentVal;
    //   }

    //   const { formula } = attribute;

    //   const requiredValues = formula.requires.map(
    //     reqAttr => this.getMaxAttribute(reqAttr)
    //   );

    //   return formula.evaluate.apply(formula, [attribute, this, currentVal, ...requiredValues]);
    // }

    // /**
    //  * @see {@link Attributes#add}
    //  */
    // addAttribute(attribute) {
    //   this.attributes.add(attribute);
    // }

    // /**
    //  * Get the current value of an attribute (base modified by delta)
    //  * @param {string} attr
    //  * @return {number}
    // */
    // getAttribute(attr) {
    //   if (!this.hasAttribute(attr)) {
    //     throw new RangeError(`Character does not have attribute [${attr}]`);
    //   }

    //   return this.getMaxAttribute(attr) + this.attributes.get(attr).delta;
    // }

    // /**
    //  * Get the base value for a given attribute
    //  * @param {string} attr Attribute name
    //  * @return {number}
    //  */
    // getBaseAttribute(attr) {
    //   var attr = this.attributes.get(attr);
    //   return attr && attr.base;
    // }

    // /**
    //  * Fired when a Character's attribute is set, raised, or lowered
    //  * @event Character#attributeUpdate
    //  * @param {string} attributeName
    //  * @param {Attribute} attribute
    //  */

    // /**
    //  * Clears any changes to the attribute, setting it to its base value.
    //  * @param {string} attr
    //  * @fires Character#attributeUpdate
    // */
    // setAttributeToMax(attr) {
    //   if (!this.hasAttribute(attr)) {
    //     throw new Error(`Invalid attribute ${attr}`);
    //   }

    //   this.attributes.get(attr).setDelta(0);
    //   this.emit('attributeUpdate', attr, this.getAttribute(attr));
    // }

    // /**
    //  * Raise an attribute by name
    //  * @param {string} attr
    //  * @param {number} amount
    //  * @see {@link Attributes#raise}
    //  * @fires Character#attributeUpdate
    // */
    // raiseAttribute(attr, amount) {
    //   if (!this.hasAttribute(attr)) {
    //     throw new Error(`Invalid attribute ${attr}`);
    //   }

    //   this.attributes.get(attr).raise(amount);
    //   this.emit('attributeUpdate', attr, this.getAttribute(attr));
    // }

    // /**
    //  * Lower an attribute by name
    //  * @param {string} attr
    //  * @param {number} amount
    //  * @see {@link Attributes#lower}
    //  * @fires Character#attributeUpdate
    // */
    // lowerAttribute(attr, amount) {
    //   if (!this.hasAttribute(attr)) {
    //     throw new Error(`Invalid attribute ${attr}`);
    //   }

    //   this.attributes.get(attr).lower(amount);
    //   this.emit('attributeUpdate', attr, this.getAttribute(attr));
    // }

    // /**
    //  * Update an attribute's base value.
    //  *
    //  * NOTE: You _probably_ don't want to use this the way you think you do. You should not use this
    //  * for any temporary modifications to an attribute, instead you should use an Effect modifier.
    //  *
    //  * This will _permanently_ update the base value for an attribute to be used for things like a
    //  * player purchasing a permanent upgrade or increasing a stat on level up
    //  *
    //  * @param {string} attr Attribute name
    //  * @param {number} newBase New base value
    //  * @fires Character#attributeUpdate
    //  */
    // setAttributeBase(attr, newBase) {
    //   if (!this.hasAttribute(attr)) {
    //     throw new Error(`Invalid attribute ${attr}`);
    //   }

    //   this.attributes.get(attr).setBase(newBase);
    //   this.emit('attributeUpdate', attr, this.getAttribute(attr));
    // }

    // /**
    //  * @param {string} type
    //  * @return {boolean}
    //  * @see {@link Effect}
    //  */
    // hasEffectType(type) {
    //   return this.effects.hasEffectType(type);
    // }

    // /**
    //  * @param {Effect} effect
    //  * @return {boolean}
    //  */
    // addEffect(effect) {
    //   return this.effects.add(effect);
    // }

    // /**
    //  * @param {Effect} effect
    //  * @see {@link Effect#remove}
    //  */
    // removeEffect(effect) {
    //   this.effects.remove(effect);
    // }

    // /**
    //  * Start combat with a given target.
    //  * @param {Character} target
    //  * @param {?number}   lag    Optional milliseconds of lag to apply before the first attack
    //  * @fires Character#combatStart
    //  */
    // initiateCombat(target: Creature, lag = 0) {
    //   if (!this.isInCombat()) {
    //     this.combatData.lag = lag;
    //     this.combatData.roundStarted = Date.now();
    //     /**
    //      * Fired when Character#initiateCombat is called
    //      * @event Character#combatStart
    //      */
    //     this.emit('combatStart');
    //   }

    //   if (this.isInCombat(target.id)) {
    //     return;
    //   }

    //   // this doesn't use `addCombatant` because `addCombatant` automatically
    //   // adds this to the target's combatants list as well
    //   this.combatants.add(target.id);
    //   if (!target.isInCombat()) {
    //     // TODO: This hardcoded 2.5 second lag on the target needs to be refactored
    //     target.initiateCombat(this, 2500);
    //   }

    //   target.addCombatant(this);
    // }

    // /**
    //  * Check to see if this character is currently in combat or if they are
    //  * currently in combat with a specific character
    //  * @param {?Character} target
    //  * @return boolean
    //  */
    // isInCombat(targetId?: string) {
    //   return targetId ? this.combatants.has(targetId) : this.combatants.size > 0;
    // }

    // /**
    //  * @param {Character} target
    //  * @fires Character#combatantAdded
    //  */
    // addCombatant(target: Creature) {
    //   if (this.isInCombat(target.id)) {
    //     return;
    //   }

    //   this.combatants.add(target.id);
    //   target.addCombatant(this);
    //   /**
    //    * @event Character#combatantAdded
    //    * @param {Character} target
    //    */
    //   this.emit('combatantAdded', target);
    // }

    // /**
    //  * @see EffectList.evaluateIncomingDamage
    //  * @param {Damage} damage
    //  * @return {number}
    //  */
    // evaluateIncomingDamage(damage, currentAmount) {
    //   let amount = this.effects.evaluateIncomingDamage(damage, currentAmount);
    //   return Math.floor(amount);
    // }

    // /**
    //  * @see EffectList.evaluateOutgoingDamage
    //  * @param {Damage} damage
    //  * @param {number} currentAmount
    //  * @return {number}
    //  */
    // evaluateOutgoingDamage(damage, currentAmount) {
    //   return this.effects.evaluateOutgoingDamage(damage, currentAmount);
    // }

    // /**
    //  * @param {Item} item
    //  * @param {string} slot Slot to equip the item in
    //  *
    //  * @throws EquipSlotTakenError
    //  * @throws EquipAlreadyEquippedError
    //  * @fires Character#equip
    //  * @fires Item#equip
    //  */
    equip(item: Item, slot: string) {
        if (this.equipment.has(slot)) {
            throw new EquipSlotTakenError();
        }

        if (item.isEquipped) {
            throw new EquipAlreadyEquippedError();
        }

        if (this.inventory) {
            this.removeItem(item);
        }

        this.equipment.set(slot, item);
        item.isEquipped = true;
        item.equippedBy = this.id;
        /**
         * @event Item#equip
         * @param {Character} equipper
         */
        item.emit('equip', this);
        /**
         * @event Character#equip
         * @param {string} slot
         * @param {Item} item
         */
        this.emit('equip', slot, item);
    }

    /**
     * Remove equipment in a given slot and move it to the character's inventory
     * @param {string} slot
     *
     * @throws InventoryFullError
     * @fires Item#unequip
     * @fires Character#unequip
     */
    unequip(slot: string) {
        if (this.isInventoryFull()) {
            throw new InventoryFullError();
        }

        const item = this.equipment.get(slot);
        item.isEquipped = false;
        item.equippedBy = null;
        this.equipment.delete(slot);
        /**
         * @event Item#unequip
         * @param {Character} equipper
         */
        item.emit('unequip', this);
        /**
         * @event Character#unequip
         * @param {string} slot
         * @param {Item} item
         */
        this.emit('unequip', slot, item);
        this.addItem(item);
    }

    /**
     * Move an item to the character's inventory
     * @param {Item} item
     */
    addItem(item: Item) {
        this.inventory.addItem(item);
        item.carriedBy = this.id;
    }

    /**
     * Remove an item from the character's inventory. Warning: This does not automatically place the
     * item in any particular place. You will need to manually add it to the room or another
     * character's inventory
     * @param {Item} item
     */
    removeItem(item: Item) {
        this.inventory.removeItem(item);
        item.carriedBy = null;
    }

    /**
     * @return {boolean}
     */
    isInventoryFull() {
        return this.inventory.isFull;
    }

    /**
     * Begin following another character. If the character follows itself they stop following.
     * @param {Character} target
     */
    follow(target: Creature) {
        if (target === this) {
            this.unfollow();
            return;
        }

        this.following = target.id;
        target.addFollower(this);
        /**
         * @event Character#followed
         * @param {Character} target
         */
        this.emit('followed', target);
    }

    /**
     * Stop following whoever the character was following
     * @fires Character#unfollowed
     */
    unfollow() {
        this.emit('unfollowed', this.following);
        this.following = null;
    }

    /**
     * @param {Character} follower
     * @fires Character#gainedFollower
     */
    addFollower(follower: Creature) {
        this.followers.add(follower.id);
        follower.following = this.id;
        /**
         * @event Character#gainedFollower
         * @param {Character} follower
         */
        this.emit('gainedFollower', follower.id);
    }

    /**
     * @param {Character} follower
     * @fires Character#lostFollower
     */
    removeFollower(follower: Creature) {
        this.followers.delete(follower.id);
        follower.following = null;
        /**
         * @event Character#lostFollower
         * @param {Character} follower
         */
        this.emit('lostFollower', follower.id);
    }

    /**
     * @param {Character} target
     * @return {boolean}
     */
    isFollowing(target: Creature) {
        return this.following === target.id;
    }

    /**
     * @param {Character} target
     * @return {boolean}
     */
    hasFollower(target: Creature) {
        return this.followers.has(target.id);
    }
}

export default Creature;
