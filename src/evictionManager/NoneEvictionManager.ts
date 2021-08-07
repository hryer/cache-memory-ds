import EvictionManager from './EvictionManager';

class NoneEvictionManager extends EvictionManager {
  constructor() {
    super();
  }

  push(limit: number, key: string, value: any): number{
    try {
      if(this.cache[key]){
        return 1;
      }
      
      if (Object.keys(this.cache).length === limit) {
        throw 'key_limit_exceeded';
      }else {
        this.cache[key] = value;
        return 0;
      }
    } catch (error) {
      throw error;
    }
  }

  get(key: string){
    if(this.cache[key]){
      return this.cache[key];
    }else {
      throw 'key_doesnt_exists';
    }
  }
}

export default NoneEvictionManager;