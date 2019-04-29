const freezeds = new WeakSet();

function freezeState(state) {
  if (typeof state === "object" && !freezeds.has(state)) {
    freezeds.add(state);
    Object.keys(state).forEach(k => {
      const val = state[k];
      if (typeof val === "object") {
        state[k] = freezeState(val);
      }
    });
  }
  Object.freeze(state);
  return state;
}

function freezeReducer(reduce) {
  return function(state, action) {
    const nextState = reduce(state, action);
    return freezeState(nextState);
  };
}

export default freezeReducer;
