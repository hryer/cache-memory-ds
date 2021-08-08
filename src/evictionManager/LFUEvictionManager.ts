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
        let tmp:any = [];
        this.use.forEach((v:any,k:any) => { tmp.push(v)});
        const min = Math.min(...tmp);

        if (this.cache.has(key)) {
          this.cache.delete(key);
        }
        this.cache.set(key, value);

        this.use.set(key, 1);

        if (this.cache.size > limit) {
          // console.log(`limit ${this.cache.size} min ${min}`)
          let list = this.cache.keys();
          let node = list.next();
          while (!node.done) {
            if (this.use.get(node.value) === min) {
              // console.log(node.value);
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

  clear(): number {
    try {
      let lengthCache = this.cache.size;
      this.cache.clear();

      return lengthCache;
    } catch (error) {
      throw error;
    }
  }

  keys(): Array<string> {
    // console.log(this.cache.keys())
    let tmp:any = [];
    this.cache.forEach((v:any,k:any) => { tmp.push(k)});
    return tmp;
  }

}

export default LFUEvictionManager;
