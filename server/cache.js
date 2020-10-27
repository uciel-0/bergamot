import NodeCache from 'node-cache';

class Cache {

  constructor(ttlSeconds) {
    this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
  }

  get(key) {
    const value = this.cache.get(key);
    if (value) {
      return Promise.resolve(value);
    }
  }

  set(key, storeFunction) {
    return storeFunction().then((result) => {
      if (result.length !== 0) {
        this.cache.set(key, result);
      } return result;
    });
  }

  del(keys) {
    this.cache.del(keys);
  }

  delStartWith(startStr = '') {
    if (!startStr) {
      return;
    }

    const keys = this.cache.keys();
    for (const key of keys) {
      if (key.indexOf(startStr) === 0) {
        this.del(key);
      }
    }
  }

  flush() {
    this.cache.flushAll();
  }
}

export default Cache;