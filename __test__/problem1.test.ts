import InMemoryCache from '../src/InMemoryCache';
import NoneEvictionManager from '../src/evictionManager/NoneEvictionManager';

const eM = new NoneEvictionManager();
const IMC = new InMemoryCache(3, eM);

test('Adding Cache', () => {
  expect(IMC.add('key1', 'value1')).toBe(0);
  expect(IMC.add('key2', 'value2')).toBe(0);
  expect(IMC.add('key3', 'value3')).toBe(0);
  expect(IMC.add('key2', 'value2.1')).toBe(1);
  expect(() => IMC.add('key4','val1')).toThrow('key_limit_exceeded');
})

test('Get Value Cache and List Keys', () => {
  expect(IMC.get('key3')).toBe('value3');
  expect(IMC.get('key1')).toBe('value1');
  expect(IMC.get('key3')).toEqual('value3');
  expect(IMC.keys()).toEqual(['key1','key2','key3']);
})

test('Clear Cache', () => {
  expect(IMC.clear()).toBe(3);
  expect(IMC.keys()).toEqual([]);
})

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