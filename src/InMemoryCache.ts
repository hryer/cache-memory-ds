import { ICache } from './types/main.interfaces';

class InMemoryCache {
  private cache: ICache;
  private limit: number;
  private evictionManager: any;

  constructor(limit: number, evictionManager: any) {
    this.cache = {};
    this.limit = limit;
    this.evictionManager = evictionManager;
  }

  add(key: string, value: string): number {
    const result: number = this.evictionManager.push(this.cache, this.limit, key, value)
    return result;
  }

  get(key: string): string {
    const result: string = this.evictionManager.get(this.cache, key);
    return result;
  }

  clear(): number {
    const result = this.evictionManager.clear(this.cache);
    this.cache = result.cache;
    return result.lengthCache;
  }

  keys(): Array<string> {
    return Object.keys(this.cache);
  }

}

class EvictionManager {
  push(cache: ICache, limit: number, key: string, value: any): number {
    try {
      if (cache[key]) {
        return 1;
      } else {
        cache[key] = value;
        return 0;
      }
    } catch (error) {
      throw error;
    }
  }

  pop(cache: ICache): string {
    try {
      const lengthCache = Object.keys(cache).length;

      if (lengthCache > 0) {
        const result:string = Object.keys(cache)[lengthCache - 1];
        return `${result} has been deleted`;
      }else {
        throw 'Error: Fail to deleted';
      }
    } catch (error) {
      throw error;
    }
  }

  clear(cache: ICache): object {
    try {
      const lengthCache = Object.keys(cache).length;
      cache = {}
      return {
        lengthCache,
        cache
      };
    } catch (error) {
      throw error;
    }
  }
}

class NoneEvictionManager extends EvictionManager {
  constructor() {
    super();
  }

  push(cache: ICache, limit: number, key: string, value: any): number{
    try {
      if (Object.keys(cache).length >= limit) {
        throw 'key_limit_exceeded';
      }else if(cache[key]){
        return 1;
      }else {
        cache[key] = value;
        return 0;
      }
    } catch (error) {
      throw error;
    }
  }

  get(cache: ICache, key: string){
    if(cache[key]){
      return cache[key];
    }else {
      throw 'key_doesnt_exists';
    }
  }
}

const eM = new NoneEvictionManager();
const IMC = new InMemoryCache(3, eM);
console.log(IMC.add('key1', 'value1'))
console.log(IMC.add('key2', 'value2'))
console.log(IMC.add('key3', 'value3'))
console.log(IMC.add('key2', 'value2.1'))
console.log(IMC.get('key3'))
console.log(IMC.get('key1'))
console.log(IMC.get('key3'))
console.log(IMC.keys())
console.log(IMC.add('key4','val1'))
console.log(IMC.keys())
console.log(IMC.clear())
console.log(IMC.keys())