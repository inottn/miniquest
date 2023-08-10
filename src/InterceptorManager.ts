type Interceptor<T> = {
  fulfilled: (value: T | PromiseLike<T>) => void;
  rejected?: (reason?: any) => void;
};

class InterceptorManager<T> {
  interceptors: Interceptor<T>[] = [];

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(
    fulfilled: (value: T | PromiseLike<T>) => void,
    rejected?: (reason?: any) => void,
  ) {
    this.interceptors.push({
      fulfilled,
      rejected,
    });
    return this.interceptors.length - 1;
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.interceptors) {
      this.interceptors = [];
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn: (interceptor: Interceptor<T>) => void) {
    this.interceptors.forEach((h) => {
      if (h !== null) {
        fn(h);
      }
    });
  }
}

export default InterceptorManager;
