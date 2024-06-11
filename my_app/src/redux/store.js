// store.js
import { createStore } from 'redux';

// Define the initial state and reducer
const initialState = {
  alertsEnabled: true,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_ALERTS':
      return { ...state, alertsEnabled: !state.alertsEnabled };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(rootReducer);

export default store;
