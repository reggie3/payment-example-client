export default function nav(nav = {}, action) {
  switch (action.type) {
    case "NAVIGATE_TO":
      return Object.assign({}, nav, {
        currentScreen: action.screen,
        screenStack: nav.screenStack.concat(action.screen)
      });
    case "NAVIGATE_BACK":
      if (nav.screenStack.length > 1) {
        // make sure there   is something in the stack to go back towards
        // get the screen to go back to
        let backTarget = nav.screenStack.slice(
         nav.screenStack.length - 2
        )[0]; // get the string at index 0 since I want the string, not the array the string is in
        // get the remaining screens so that they can become the updated    stack array
        let correctArray = nav.screenStack.slice(0, -1);

        return Object.assign({}, nav, {
            currentScreen: backTarget,
            screenStack: correctArray
        });
      }
    //just return the current appState if there is nothing to go back to return appState;
    default:
      return nav;
  }
}
