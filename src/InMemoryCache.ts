import { ICache } from './types/main.interfaces';

class InMemoryCache {
  private limit: number;
  private evictionManager: any;

  constructor(limit: number, evictionManager: any) {
    this.limit = limit;
    this.evictionManager = evictionManager;
  }

  add(key: string, value: string): number {
    const result: number = this.evictionManager.push(this.limit, key, value)
    return result;
  }

  get(key: string): string {
    const result: string = this.evictionManager.get(key);
    return result;
  }

  clear(): number {
    const result = this.evictionManager.clear();
    return result;
  }

  keys(): Array<string> {
    return this.evictionManager.keys();
    // return Object.keys(this.cache);
  }

}

export default InMemoryCache;
