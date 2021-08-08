import EvictionManager from './EvictionManager';

/* TODO:: Refactor using map not object on cache */

class DNode {
  private key: string;
  private value: any;
  next: any;
  prev: any;

  constructor(key: string, value: any) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class LRUEvictionManager extends EvictionManager {
  private head: any;
  private tail: any;
  private size: number;

  constructor() {
    super();
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  pop(): string {
    const keyDNode = this.tail ? this.tail.key : null;

    if (!this.tail) {
      throw 'key_doesnt_exists';
    } else if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      delete this.cache[keyDNode];
      this.size--;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
      delete this.cache[keyDNode]
      this.size--;
    }

    return keyDNode;
  }

  push(limit: number, key: string, value: any) {
    try {
      let newDNode;

      if (this.cache[key]) {
        return 1;
      } else {
        newDNode = new DNode(key, value);
      }

      if (this.size === 0) {
        this.head = newDNode;
        this.tail = newDNode;
        this.size++;
        this.cache[key] = newDNode;
        return 0;
      }

      if (this.size === limit) {
        this.pop();
      }

      this.head.prev = newDNode;
      newDNode.next = this.head;
      this.head = newDNode;
      this.size++;

      this.cache[key] = newDNode;
      return 0;

    } catch (error: any) {
      throw error;
    }
  }

  get(key: string) {
    if (!this.cache[key]) {
      throw 'key_doesnt_exists';
    } else {
      let foundNode = this.cache[key];

      if (foundNode === this.head) return foundNode;

      let foundPrev = foundNode.prev;
      let foundNext = foundNode.next;

      if (foundNode === this.tail) {
        foundPrev.next = null;
        this.tail = foundPrev;
      } else {
        foundPrev.next = foundNext;
        foundNext.prev = foundPrev;
      }

      this.head.prev = foundNode;
      foundNode.next = this.head;
      foundNode.prev = null;
      this.head = foundNode;

      return foundNode.value;
    }
  }

  clear(): number {
    try {
      const lengthCache = Object.keys(this.cache).length;
      this.cache = {};
      this.head = null;
      this.tail = null;
      this.size = 0;
      return lengthCache;
    } catch (error) {
      throw error;
    }
  }
}

export default LRUEvictionManager;