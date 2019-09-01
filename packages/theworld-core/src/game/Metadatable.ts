'use strict';


const Metadatable = (parentClass: FunctionConstructor) =>

class extends parentClass {
    metadata: any;
  setMeta(key: string, value: any) {
    if (!this.metadata) {
      throw new Error('Class does not have metadata property');
    }

    let parts = key.split('.');
    const property = parts.pop();
    let base = this.metadata;

    while (parts.length) {
      let part = parts.shift();
      if (!(part in base)) {
        throw new RangeError(`Metadata path invalid: ${key}`);
      }
      base = base[part];
    }

    const oldValue = base[property];
    base[property] = value;

    /**
    * @event Metadatable#metadataUpdate
    * @param {string} key
    * @param {*} newValue
    * @param {*} oldValue
    */
    this.emit('metadataUpdated', key, value, oldValue);
  }
    emit(arg0: string, key: string, value: any, oldValue: any) {
        throw new Error("Method not implemented.");
    }
  getMeta(key: string) {
    if (!this.metadata) {
      throw new Error('Class does not have metadata property');
    }

    const base = this.metadata;
    return key.split('.').reduce((obj, index) => obj && obj[index], base);
  }
};

module.exports = Metadatable;
