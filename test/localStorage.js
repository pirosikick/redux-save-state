"use strict";
import assert from "assert";
import sinon  from "sinon";
import {createStore, combineReducers, applyMiddleware} from 'redux';
import saveTo from "../lib/localStorage";

describe("localStorage", function () {
  beforeEach(function () {
    global.window = {};
    this.localStorage = global.window.localStorage = {};
  });

  const key = "LOCALSTORAGE_KEY";
  const action = { type: "TEST_ACTION" };

  const reducer = (state, action) =>
    action.type === "TEST_ACTION" ? { a:'a', b:'b' } : {};

  const storeWithMiddleware = middleware => {
    let combined = combineReducers({ test: reducer });
    return applyMiddleware(middleware)(createStore)(combined);
  };

  it("save the state as JSON to localStorage[key]", function () {
    let middleware = saveTo(key);
    let store = storeWithMiddleware(middleware);

    store.dispatch(action);

    assert.equal(this.localStorage[key], JSON.stringify(store.getState()));
  });

  describe('options.callback', function () {
    beforeEach(function () {
      let callback = this.callback = sinon.spy();
      this.store = storeWithMiddleware(saveTo(key, { callback }));
    });

    it("is called after saved", function () {
      this.store.dispatch(action);
      assert.ok(this.callback.calledOnce);
    });
  });

  describe("options.debounce", function () {
    beforeEach(function () {
      let debounce = this.debounce = 200;
      this.store = storeWithMiddleware(saveTo(key, { debounce }));
    });

    it("delays setting the state to localStorage", function (done) {
      this.store.dispatch(action);
      assert.equal(this.localStorage[key], undefined);

      // wait `debounce` miliseconds
      setTimeout(() => {
        assert.equal(this.localStorage[key], JSON.stringify(this.store.getState()));
        done();
      }, this.debounce);
    });
  });

  describe('options.filter', function () {
    beforeEach(function () {
      let filter = this.filter = state => ({ c: 'c' });
      this.store = storeWithMiddleware(saveTo(key, { filter }));
    });

    it("sets return value of filter to localStorage[key]", function () {
      this.store.dispatch(action);
      assert.equal(this.localStorage[key], JSON.stringify({ c: 'c' }));
    });
  });

  describe("when key is not string", function () {
    it("throws Error", function () {
      try {
        saveTo();
        assert.fail();
      } catch (e) {
        assert.equal(e.message, "key is required.");
      }
    });
  });

});
