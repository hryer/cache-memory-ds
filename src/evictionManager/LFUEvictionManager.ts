// import EvictionManager from './EvictionManager';
// import { ICache } from '../types/main.interfaces';
class LFUEvictionManager {

  private use: any;
  private cache: any;

  constructor() {
    this.use = new Map();
    this.cache = new Map();
  }

  get(key: string) {
    try {
      let res;
      if (!this.cache.has(key)) {
        throw 'key_doesnt_exists';
      } else {
        let count = this.use.get(key);
        res = this.cache.get(key);
        this.use.set(key, count++);
        this.cache.delete(key);
        this.cache.set(key, res);
      }
      return res;
    } catch (error) {
      throw error;
    }
  }

  push(limit: number, key: string, value: any): number {
    try {
      if (this.cache.has(key)) {
        return 1;
      } else {
        const min = Math.min(...this.use.values());
        if (this.cache.has(key)) {
          this.cache.delete(key);
        }
        this.cache.set(key, value);
        if (!this.use.has(key)) {
          this.use.set(key, 1);
        } else {
          let count = this.use.get(key);
          this.use.set(key, count + 1);
        }

        if (this.cache.size > limit) {
          let list = this.cache.keys();
          let node = list.next();
          while (!node.done) {
            if (this.use.get(node.value) === min) {
              this.use.delete(node.value);
              this.cache.delete(node.value);
              break;
            }
            node = list.next();
          }
        }

        return 0;
      }
    } catch (error) {
      throw error;
    }
  }

}

export default LFUEvictionManager;
