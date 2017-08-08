let navActions = {
  navigateTo: screen => {
    return {
      type: "NAVIGATE_TO",
      screen
    };
  },
   navigateBack: screen => {
    return {
      type: "NAVIGATE_BACK",
    };
  }
};

export default navActions;
