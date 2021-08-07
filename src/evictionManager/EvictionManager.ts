import { ICache } from '../types/main.interfaces';

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

export default EvictionManager;