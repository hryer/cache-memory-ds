import { ICache } from '../types/main.interfaces';

/* TODO:: Refactor using map not object */

class EvictionManager {
  public cache: ICache;

  constructor() {
    this.cache = {}
  }

  push(limit: number, key: string, value: any): number {
    try {
      if (this.cache[key]) {
        return 1;
      } else {
        this.cache[key] = value;
        return 0;
      }
    } catch (error) {
      throw error;
    }
  }

  pop(): string {
    try {
      const lengthCache = Object.keys(this.cache).length;

      if (lengthCache > 0) {
        const result:string = Object.keys(this.cache)[lengthCache - 1];
        return `${result} has been deleted`;
      }else {
        throw 'Error: Fail to deleted';
      }
    } catch (error) {
      throw error;
    }
  }

  clear(): number {
    try {
      const lengthCache = Object.keys(this.cache).length;
      this.cache = {};
      
      return lengthCache;
    } catch (error) {
      throw error;
    }
  }

  keys(): Array<string> {
    return Object.keys(this.cache);
  }
}

export default EvictionManager;