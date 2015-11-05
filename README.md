[![npm version](https://badge.fury.io/js/redux-save-state.svg)](http://badge.fury.io/js/redux-save-state)
[![david](https://david-dm.org/pirosikick/redux-save-state.svg)](https://david-dm.org/pirosikick/redux-save-state)
[![Build Status](https://travis-ci.org/pirosikick/redux-save-state.svg)](https://travis-ci.org/pirosikick/redux-save-state)

redux-save-state
=================

redux middleware which saves the state to localStorage.

## Usage

```javascript
import {createStore, applyMiddleware} from "redux";
import saveState from "redux-save-state/localStorage";
import combinedReducers from "./reducer";

const createStoreWithMiddlewares
  = applyMiddleware(saveState({ key: 'appState' }))(createStore);
const store = createStoreWithMiddlewares(combinedReducers);

// In React Component
store.dispatch(action);

console.log(localStorage.appState); // state as JSON string
```

### options

#### `key` : String

key in localStorage.

#### `filter`: Function

default `state => state`.
Saves the value returned by `filter` function.

#### `debounce`: Number

default 0.
Delays setting the state to localStorage until `debounce` milliseconds have elapsed since the last time the action was dispatched.
See also [_.debounce](https://lodash.com/docs#debounce).

## License

[MIT](http://pirosikick.mit-license.org/)
