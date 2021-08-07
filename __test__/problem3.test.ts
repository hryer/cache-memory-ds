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