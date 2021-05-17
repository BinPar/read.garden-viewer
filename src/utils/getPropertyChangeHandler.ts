import { CurrentPromiseEnder, UniqueKeyPromiseEnder } from '../model/events';
import { PropertyChangeHandler } from '../model/state';

/**
 * Gets property change handler methods
 * @param override When `true`, only last submitted promise will be resolved when property
 * changes to desired value. The previous ones will be rejected. It will work like some kind of
 * debouncer. When `false`, all promises will be queued and resolved. If `uniqueKey` is provided
 * to `waiter` method, only last promise with same `key` will be resolved (previous ones will be
 * rejected)
 * @returns `resolver` (executes when property gets desired value) and `waiter` (subscribes and
 * waits for property change) methods
 */
const getPropertyChangeHandler = (override?: boolean): PropertyChangeHandler => {
  if (override) {
    let currentResolve: CurrentPromiseEnder = null;
    let currentReject: CurrentPromiseEnder = null;

    return {
      resolver: (): void => {
        if (currentResolve) {
          currentResolve();
        }
        currentReject = null;
        currentResolve = null;
      },
      waiter: async (): Promise<void> => {
        if (currentReject) {
          currentReject();
        }
        return new Promise<void>((resolve, reject) => {
          currentResolve = resolve;
          currentReject = reject;
        });
      },
    };
  }

  const resolvers: UniqueKeyPromiseEnder[] = [];

  return {
    resolver: (): void => {
      let promise = resolvers.shift();
      while (promise) {
        promise.resolve();
        promise = resolvers.shift();
      }
    },
    waiter: async (uniqueKey?: string): Promise<void> =>
      new Promise((resolve, reject) => {
        if (uniqueKey) {
          const existingIndex = resolvers.findIndex((r) => r.key === uniqueKey);
          if (existingIndex !== -1) {
            const existing = resolvers[existingIndex];
            existing.reject();
            resolvers.splice(existingIndex, 1);
          }
        }
        resolvers.push({
          key: uniqueKey,
          resolve,
          reject,
        });
      }),
  };
};

export default getPropertyChangeHandler;
