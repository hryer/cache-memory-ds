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

export default InMemoryCache;

// const eM = new NoneEvictionManager();
// const IMC = new InMemoryCache(3, eM);
// console.log(IMC.add('key1', 'value1'))
// console.log(IMC.add('key2', 'value2'))
// console.log(IMC.add('key3', 'value3'))
// console.log(IMC.add('key2', 'value2.1'))
// console.log(IMC.get('key3'))
// console.log(IMC.get('key1'))
// console.log(IMC.get('key3'))
// console.log(IMC.keys())
// console.log(IMC.add('key4','val1'))
// console.log(IMC.keys())
// console.log(IMC.clear())
// console.log(IMC.keys())