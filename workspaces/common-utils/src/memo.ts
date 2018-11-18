export type Memoizable<K, V> = (key: K) => V;

export interface Memoized<K, V> {
  (key: K): V;

  remove(key: K): boolean;
}

export interface MemoOptions<K> {
  stringifyKey?: (key: K) => string;
}

export function createMemo<K, V>(
  fn: Memoizable<K, V>,
  { stringifyKey }: MemoOptions<K> = {}
): Memoized<K, V> {
  const cache = new Map<string | K, V>();

  function memoized(key: K): V {
    const keyString = !stringifyKey ? key : stringifyKey(key);

    if (cache.has(keyString)) {
      return cache.get(keyString)!;
    }

    const computed = fn(key);

    cache.set(keyString, computed);

    return computed;
  }

  Object.defineProperties(memoized, {
    delete: {
      writable: false,
      enumerable: false,
      configurable: false,
      value(key: K) {
        return cache.delete(key);
      }
    }
  });

  return memoized as Memoized<K, V>;
}

export function createPromiseMemo<K, V>(
  fn: Memoizable<K, Promise<V>>,
  options?: MemoOptions<K>
): Memoized<K, Promise<V>> {
  const memoized = createMemo(
    (key: K) =>
      fn(key).catch(error => {
        memoized.remove(key);

        return Promise.reject(error);
      }),
    options
  );

  return memoized;
}
