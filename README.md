[![npm version](https://badge.fury.io/js/redux-save-state.svg)](http://badge.fury.io/js/redux-save-state)
[![david](https://david-dm.org/pirosikick/redux-save-state.svg)](https://david-dm.org/pirosikick/redux-save-state)
[![Build Status](https://travis-ci.org/pirosikick/redux-save-state.svg)](https://travis-ci.org/pirosikick/redux-save-state)

redux-save-state
=================

redux middleware which saves the state to localStorage.

## Usage

### Interface
### Example

```javascript
import {createStore, applyMiddleware} from "redux";
import {localStorage as saveState} from "redux-save-state/localStorage";
import combinedReducers from "./reducer";

const createStoreWithMiddlewares
  = applyMiddleware(saveState('appState'))(createStore);
const store = createStoreWithMiddlewares(combinedReducers);

// In React Component
store.dispatch(action);

console.log(localStorage.appState); // state as JSON string
```

### Interface

```javascript
import saveState from "redux-save-state/localStorage";

const key = "some_key_string";
const options = { ... };
const middleware = saveState(key, options);
```

#### `key` : String

Required. The key in localStorage to save state.

#### `options.filter`: Function(state: object) => object

default `state => state`.
Saves the value returned by `filter` function.

#### `options.debounce`: Number

default 0.
Delays setting the state to localStorage until `debounce` milliseconds have elapsed since the last time the action was dispatched.
See also [_.debounce](https://lodash.com/docs#debounce).

#### `options.callback`: Function(store) => any



## License

[MIT](http://pirosikick.mit-license.org/)
