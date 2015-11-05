"use strict";
import assign from "lodash/object/assign";
import debounceFn from "lodash/function/debounce";
import wrap from "lodash/function/wrap";
import noop from "lodash/utility/noop";

/**
 * @param {String} key
 * @param {Object} options
 */
function saveToLocalStorage(key, options = {}) {
  let {callback, filter, debounce} = assign({ callback: noop }, options);

  if (typeof key !== "string") {
    throw new Error("key is required.");
  }

  return store => {
    let save = (key, state) => {
      window.localStorage[key] = JSON.stringify(state);

      if (typeof callback === 'function') {
        callback(store);
      }
    }

    if (typeof filter === 'function') {
      save = wrap(save, (save, key, state) => save(key, filter(state)));
    }

    debounce = parseInt(debounce);
    if (debounce > 0) {
      save = debounceFn(save, debounce);
    }

    return next => action => {
      let state = store.getState();
      save(key, store.getState());
      return next(action);
    };
  }
}

export default saveToLocalStorage;
