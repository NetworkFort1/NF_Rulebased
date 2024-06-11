// reducers.js
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
  
  export default rootReducer;
  