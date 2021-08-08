import EvictionManager from './EvictionManager';
import { ICache } from '../types/main.interfaces';

class CacheNode {
  key:string;
  public value:any;
  public frequency:number;

  constructor(key:string, value:any, frequency:number){
    this.key = key;
    this.value = value;
    this.frequency = frequency;
  }
}
class LFUEvictionManager extends EvictionManager{
  // private cache:any;/* Map<Integer, CacheNode> */
  private frequencyList:any; /* new Set() max limit x 2 */
  private lowestFrequency:number;
  // private maxFrequency:number;
  // private maxCacheSize:number;
  private currSize:number;
  private heap:any;

  constructor(limit:number){
    super();
    this.lowestFrequency = 0;
    // this.maxFrequency = limit * 2 - 1;
    // this.maxCacheSize = limit;
    this.currSize = 0;
    this.heap = [];
  }

  getMin (){
    return this.heap[0];
  }

  push(limit: number, key: string, value: any) {
    try {
      let newNode;
    
      if (this.cache[key]) {
        return 1;
      } else {
        if(limit === this.currSize){
          // eviction (pengurangan / remove root minheap)

        }
        // save new node to latest array
        newNode = new CacheNode(key, value, 0);
        this.heap.push(newNode);
        this.cache[key] = newNode;

        // finding correct position for the new node
        if(this.heap.length > 1){
          // freq 2 3 0
          let curr = this.heap.length - 1;

          while( curr > 1 && this.heap[Math.floor(curr/2)] > this.heap[curr])
        }

        return 0; 
      }
    } catch (error) {
      throw error;
    }
  }

  addFrequency(currentNode:CacheNode){
    let currentFrequency:number = currentNode.frequency;

    if(currentFrequency < this.maxFrequency) {
      let nextFrequency:number = currentFrequency + 1;
      currentNode = this.frequencyList[currentFrequency];
      // newNodes = this.frequencyList[nextFrequency];
      // moveToNextFr
    }
  }

  moveToNextFrequency(currentNode:CacheNode, nextFrequency:number, currentNodes:any, newNodes:any){
    currentNodes.remove
  }

  findNextLowestFrequency() {
    while (this.lowestFrequency <= this.maxFrequency && this.frequencyList[this.lowestFrequency] === null ){
      this.lowestFrequency++;
    }

    if(this.lowestFrequency > this.maxFrequency){
      this.lowestFrequency = 0;
    }
  }
}

export default LFUEvictionManager;
