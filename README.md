React/Redux Shopping Cart Exercise
----------------------------------

This repository is an exercise of a shopping cart.
It simulates a small catalog that is shown in the main view,
it displays some products, and they can be added to the cart.
The cart itself shows the product count continuously, 
and in its page shows each product quantity, to options to add,
remove, drop, and increase the price. It also shows the total price.
No remote server calls are involved in it.

The implementation is done with React, Redux, and Reselect. It also provides a small library of utils that includes hooks for Redux, and a store freezer to avoid unintended mutations of the redux state.

### Setup

You need node v12. If you are using Windows install it from https://nodejs.org , if you are using Mac or Linux use nvm. You can install nvm from http://nvm.sh , once it is installed and running execute `nvm install v12`, set it as default with `nvm alias default v12`, and change to that version with `nvm use v12`. The nvm allows you to use multiple node versions in the same computer, although there is a version for Windows, it is not fully compatible.

Install also `yarn` from https://yarnpkg.com . You can almost replace `yarn` with the `npm` provided by node itself, but `yarn` works better in faulty networks.

Clone the repository.

Install all dependencies, execute `yarn` without arguments in the same directory.

Check that the system is correctly by executing `yarn test`. If you have the exercise version, it is expected to fail tests under `ducks/`.

For more details about this environment look to the file [README-react.md](./README-react.md).

### Recommended IDE

Use **Visual Code Studio** to work in this project.

Download it from https://code.visualstudio.com/ .
Use `Cmd+C` in mac or, probably, `Ctrl+C` in windows to open a terminal in the current project.

Add the following plugins:

- **EditorConfig for VS Code** https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig : it configures tab vs space, tab size, and others for the project.

- **ESLint** https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint : it checks javascript code in real time and highlights errors that you write before executing it in the browser.

- **Prettier - Code formatter** https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode : it formats the code correctly for ease reading. Use the format on save option.

You may also want to install the *Jest* https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest plugin, but in some cases, it does not work very well, and it is better to use the command `yarn test` manually. If it is your case, uninstall or disable it.


### Browser extensions

Use the follow browser extensions to debug the application as you work with it:

- **React Developer Tools**: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi

- **Redux DevTools**: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

### Run and Test

Use `yarn start` to start the browser and see the current application.

Use `yarn test` to start tests in the console. 

Use `yarn test --coverage` to see the coverage.

Inside the test, there is a menu that allows you to focus on some tests. 

```
Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.
```

Use `p` to select which test file you want to execute, use `t` to choose which specs inside a file you wish to focus. 

**Important**: before committing ensure that all tests run and everything is covered. Use `a` to ensure that all tests run. 

### Learn Javascript, React and Redux

There is some material to learn Javascript, React and Redux that you can use:

- Look slides at https://www.slideshare.net/DavidRdenasPic/presentations

- Fork the repository https://github.com/drpicox/learn-javascript-bytesting-jest and solve it

- Fork the repository https://github.com/drpicox/learn-redux-bytesting and solve it

- Fork the repository https://github.com/drpicox/learn-redux-zoo-bytesting and fix all tests. This is different from the previous two, it guides you step by step for the building of a Redux application.

### import and export

Symbols, values, functions, classes, objects... are exported where they are defined and imported when they are needed.

The `import` keyword allows getting symbols from other files. If the import is an absolute path, it imports a symbol from a library inside `node_modules/`. If the import has a relative path, it gets the symbol from a file in the project. Example:

- `import React from 'react';`: imports React from the react library
- `import makeApp from '../makeApp';`: imports makeApp function exported by the file in the parent directory called  `makeApp.js`. Note that the extension can be omitted. 
- `import view from './view';`: it imports the view reducer from the view directory. In this specific case, it imports the reducer function from file `index.js`. It automatically looks for the `index.js` file like it was the default extension of a directory.

All previous example imports the default symbol. There is one and only one default symbol for each file, but there can be many named symbols. Named symbols can be got by destructuring the import:

- `import { cleanup, render } from "react-testing-library";` : it imports the cleanup function and the render function from the specified library.

To export a symbol from a file, so another file can use it, utilize the `export` keyword. An example is:

1. `export default makeApp;` , makes _makeApp_ as the default thing to import from outside. Note that you need to define what is makeApp in that file previous to the export.

Only in redux actions we will export named symbols. See ducks actions.

### `src/libs`

This project provides the `libs/` directory.

It provides the definition for some hooks and for the freezer.
It also has examples of testing of react components, hooks, and redux ducks.

I strongly recommend reading this directory frequently.

### Solving the Exercise, Step 1: Redux

Redux is the state management of the application. All the implementation of this is at `src/ducks/`. 

**What is Redux?** Redux is a state manager. It has a method called `createStore` that creates a store object that has three methods: `getState`, `dispatch`, and `subscribe`.

A reference implementation can be found at
https://blog.isquaredsoftware.com/2017/05/idiomatic-redux-tao-of-redux-part-1/

```javascript
function createStore(reducer, initialState, enhancer) {
    if (enchancer) return enhancer(createStore)(reducer, initialState);
    var state = initialState;
    var listeners = []

    function getState() {
        return state
    }
    
    function subscribe(listener) {
        listeners.push(listener)
        return function unsubscribe() {
            var index = listeners.indexOf(listener)
            listeners.splice(index, 1)
        }
    }
    
    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }

    dispatch({})

    return { dispatch, subscribe, getState }
}
```

The method `subscribe` is used automatically by the views. When you use `useSelect` or `useReselect`, your component automatically subscribes to the store and is notified when the state is updated. You should never use this method directly.

The method `getState` gets all the data content of the store. The data content must always be a serializable json object. This object cannot be mutated, changed. In components this method is called by `useSelect` or `useReselect`. This method is used directly in `ducks` tests.

The method `dispatch` triggers a new action in the store. It receives a serializable json object with a field called `type` with a string value. It uses the current state and the new action to compute a new state. It invokes all subscribers when the new result is invoked. This method is called by `useDispatch`. This method is used directly in `ducks` tests.

https://redux.js.org/introduction/core-concepts explains what a state is, and what an action is with detail. 

The reducer is a function that given a state and an action it computes the next state. Because the state is immutable, it always creates a new state object. The reducer itself is composed of multiple reducers, if you look to `createDucksReducer`, you can see that it creates a new reducer by calling `combineReducers`. This function creates a new reduce function by combining other reduce actions. The created reducer is an object in which each property is computed by the corresponding reducer.

Although you think that creating a new object state for each action is slow, it is not. In fact, it helps to speed up of all the updates of the views, and the system usually gots faster.

Because the state is an immutable serializable json object, there few standard techniques that helps to create new states:

```javascript
const state = { a: 1, b: 2 }
const addNewField = {...state, c: 3 }
expect(addNewField).toBe({ a: 1, b: 2, c: 3 });

const provideADefaultValue = { a: 7, ...state }
expect(provideADefaultValue).toBe({ a: 1, b: 2 });

const otherObject = { b: 3, c: 4 }
const mergeTwoObjects = {...state, ...otherObject }
expect(provideADefaultValue).toBe({ a: 1, b: 3, c: 4 });

const key = 'c';
const value = 5;
const setAComputedKeyValue = {...state, [key]: value };
expect(setAComputedKeyValue).toBe({ a: 1, b: 2, c: 5 });

const state = [ 1, 2, 3 ];
const appendAValue = [...state, 4 ];
expect(appendAValue).toBe([1, 2, 3, 4]);

const preppendAValue = [4, ...state];
expect(preppendAValue).toBe([4, 1, 2, 3]);

const removeAValue = state.filter(x => x !== 2);
expect(appendAValue).toBe([1, 3]);

const changeAValue = state.map(x => x !== 2 ? x : '5');
expect(changeAValue).toBe([1, 5, 3]);

const otherArray = [4, 5]
const concatenateArrays = [...state, ...otherArray];
expect(concatenateArrays).toBe([1, 2, 3, 4, 5]);
```

There is a convention in Redux that says that you should never dispatch an action directly by writing the action object.

```javascript
// do not do this
store.dispatch({ type: 'INCREMENT', quantity: 1 });
```

You should call a custom actionCreator. This action creator is a function that receives the parameters that the action requires and creates it. The naming of the action creator is the name of the action itself, and in the same file, it also defines a constant with the action type. 

```javascript
// ducks/myDuck/actions/increment.js
export const INCREMENT = 'increment';
export function increment(quantity) {
  return { type: INCREMENT, quantity };
}
// somewhere else
import { increment } from '../myDuck/actions/increment';
store.dispatch(increment(1));
```

**What is a duck?** A _duck_ is a redux module contains the reducer, the selectors, and actions:


```
- src/ducks/
  - createDucksStore.js
  - view/ 
    - index.js        # exports the reducer of the duck
    - actions/
      - setView       # exports { setView and SET_VIEW } action creator and type constant
    - selectors/
      - getView       # exports de getView function selector
    - __tests__
      - view.spec.js # testing of the view
```

There are some selectors that instead of `getSomething` are `makeGetSomething`. 
These are selector creators. You can find examples inside `src/lib/__test__/listDuck/selectors`. They exist in order to enable memoization and boost performance.

All `makeGetSomething` selectors should be used when the selector does not return a direct value from the state, or when it returns a complex value. You should use the `reselect` library in such cases. An example is:

```javascript
import { createSelector } from "reselect";
import getList from "./getList";

function makeGetHistogram() {
  return createSelector(
    getList,
    list => {
      const counts = {};
      list.forEach(item => {
        counts[item] = (counts[item] || 0) + 1;
      });

      return Object.entries(counts).map(([item, count]) => ({ item, count }));
    }
  );
}

export default makeGetHistogram;
```

Note that `createSelector` creates a selector function that uses the result of other selectors to create a new result. The reason of that step is to allow memoization: each time that the selector is invoked, it checks if all values are the same of the last call, if they are the same it returns the previous value, if not it computes a new value.

Note that a `makeGetSelector` can use another `makeGetSelector`:

```javascript
import { createSelector } from "reselect";
import makeGetHistogram from "./makeGetHistogram";

function makeIsRepeated() {
  const getHistogram = makeGetHistogram();
  const getItem = (_, { item }) => item;

  return createSelector(
    getHistogram,
    getItem,
    (histogram, item) =>
      !!histogram.find(entry => entry.item === item && entry.count > 1)
  );
}

export default makeIsRepeated;
```

In this exercise, you must implement the ducks for the `catalog` and the `cart`. Provided tests inside `ducks` cannot be changed, and at the end of this exercise, all must pass. 

Note that `expect(prev).toBe(next)` checks some memorizations, but in some cases, the result is a value, and this check is not possible. The student has de task of determining if a computation is complex enough to require memorization.

Note also that the expected code coverage of `ducks` is 100%.

### Solving the Exercise, Step 2: React

In this step, you have to:

- create the visual components and their connections to redux,
- create the tests to verify that everything works,
- create the application that works in the browser.

This repository uses `react-bootstrap`. It is a library based in bootstrap that eases the construction of the presentation. 

The file `initialState.json` has the initial catalog of the application. The `index.js` uses it to initialize the redux state.

The file `makeApp.js` creates the redux store and the main view. 

The components to change or implement are at  `src/components`.

The tests to implement and solve are at `src/__tests__`.

Note that some tests only have the text, but they have no content. You must implement the content of those tests.

The file `src/__tests__/renderApp.js` is a helper for the tests. There are some helper functions to make tests more natural to read. Add here your own functions. Tests must be easy to read.

The expected code coverage is 100%. Create also new components to make them more comfortable to read and understand.

Use from `src/lib` `useDispatch`, `useSelect` and `useReselect` to access to the Redux store. Look at tests of these tools to understand better how they work. Here https://reactjs.org/docs/hooks-intro.html explains what a hook is and what hooks are available by default in redux. You do not need to use any of the default hooks.

React compares the result of the component to know if something is changed. If action callbacks are passed directly, it thinks that it varies each time that it is invoked, and the performance is slow.

```javascript
// do not do this
import useDispatch from '../lib/useDispatch';
import { increment } from '../ducks/myDuck/actions/increment';
function MyIncrementer() {
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(increment(1))}>+ 1</button>
}
```

Instead, delegate `useDispatch` the function creation that does the exact same action that you want. It always returns the same function and removes the performance issue.

```javascript
import useDispatch from '../lib/useDispatch';
import { increment } from '../ducks/myDuck/actions/increment';
function MyIncrementer() {
  const incrementOne = useDispatch(increment, 1);
  return <button onClick={incrementOne}>+ 1</button>
}
```

If you use array.map to create multiple elements, and each element has a different callback value, you should also avoid the direct callback.

```javascript
// do not do this
import useDispatch from '../lib/useDispatch';
import { increment } from '../ducks/myDuck/actions/increment';
const increments = [1,2,3,4,5];
function MyManyIncrementer() {
  const dispatch = useDispatch();
  return (
    <div>
    {increments.map(i => (
      <button key={i} onClick={() => dispatch(increment(i))}>+ {i}</button>
    ))}
    </div>
  );
}
```

Create a new component instead.

```javascript
// src/components/MyManyIncrementers.js
import MyIncrementer from './MyIncrementer';
const increments = [1,2,3,4,5];
function MyManyIncrementer() {
  return (
    <div>
    {increments.map(i => (
      <MyIncrementer key={i} quantity={i} />
    ))}
    </div>
  );
}
// src/components/MyIncrementer.js
import useDispatch from '../lib/useDispatch';
import { increment } from '../ducks/myDuck/actions/increment';
function MyManyIncrementer({ quantity }) {
  const incrementQuantity = useDispatch(increment, quantity);
  return (
      <button onClick={incrementQuantity}>+ {quantity}</button>
  );
}
```

The `useSelect` and `useReselect` has no mistery. The first with selectors directly, the latter uses selector creators. The `useReselect` invokes the make selector function for each component that you have, which ensures a fast memoization behavior. 

```javascript
import useSelect from '../lib/useSelect';
import useReselect from '../lib/useReselect';
import getCount from '../ducks/myDuck/selectors/getCount';
import makeGetCountSum from '../ducks/myDuck/selectors/makeGetCountSum';
function ShowCounters({ quantity }) {
  const count1 = useSelect(getCount, 1);
  const count2 = useSelect(getCount, 2);
  const allCountersSum = useReselect(makeGetCountSum);
  return (
    <div>
      The first count has value {count1}.<br />
      The second count has value {count2}.<br />
      All counters sum the value {allCountersSum}.<br />
    </div>
  );
}
```

Of course, although you are using TDD, do not forget to run your app and check visually that it works.
