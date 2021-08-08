// limit = 3, evictionManager = LFUEvictionManager
// cache.Add('key1', 'value1') // return 0
// cache.Add('key2', 'value2') // return 0
// cache.Add('key3', 'value3') // return 0
// cache.Add('key2', 'value2.1') // return 1
// cache.Get('key3') // return value3
// cache.Get('key1') // return value1
// cache.Get('key2') // return value2.1
// cache.Get('key3') // return value3
// cache.Get('key1') // return value1
// cache.Keys() // return ['key1', 'key2', 'key3']
// cache.Add('key4') // return 0
// cache.Keys() // return ['key1', 'key3', 'key4']
// // (key1 has 2 freq, key 2 has 1 freq, and key 3 has 2 freq, so when key4 added, we will remove key 2 from cache)
// cache.Clear() // return 3
// cache.Keys() // return []

import InMemoryCache from '../src/InMemoryCache';
import LFUEvictionManager from '../src/evictionManager/LFUEvictionManager';

const eM = new LFUEvictionManager(3);
const IMC = new InMemoryCache(3, eM);

test('Adding Cache', () => {
  expect(IMC.add('key1', 'value1')).toBe(0);
  expect(IMC.add('key2', 'value2')).toBe(0);
  expect(IMC.add('key3', 'value3')).toBe(0);
  expect(IMC.add('key2', 'value2.1')).toBe(1);
  expect(IMC.add('key4', 'value4')).toBe(0);
  expect(IMC.keys()).toEqual(['key2','key3','key4']);
  expect(IMC.get('key2')).toEqual('value2');
  expect(IMC.add('key5', 'value5')).toBe(0);
  expect(IMC.keys()).toEqual(['key2','key4','key5']);
})

test('Get Value Cache and List Keys', () => {
  expect(IMC.get('key2')).toBe('value2');
  expect(IMC.get('key4')).toBe('value4');
  expect(IMC.keys()).toEqual(['key2','key4','key5']);
})

test('Clear Cache', () => {
  expect(IMC.clear()).toBe(3);
  expect(IMC.keys()).toEqual([]);
})