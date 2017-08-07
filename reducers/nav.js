import { addNavigationHelpers } from "react-navigation";
import { AppNavigator } from "../navigation/AppNavigator";

debugger;
const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams("Main")
);

export default function nav(state = initialState, action) {
  let nextState;
  switch (action.type) {
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
