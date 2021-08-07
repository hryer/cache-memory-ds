import { ICache } from '../types/main.interfaces';
import EvictionManager from './EvictionManager';

class NoneEvictionManager extends EvictionManager {
  constructor() {
    super();
  }

  push(cache: ICache, limit: number, key: string, value: any): number{
    try {
      if(cache[key]){
        return 1;
      }
      
      if (Object.keys(cache).length >= limit) {
        throw 'key_limit_exceeded';
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

export default NoneEvictionManager;