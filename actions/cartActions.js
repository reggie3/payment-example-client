let cartActions = {
    addToCart: (item) => {
    return {
      type: "ADD_TO_ITEM",
      item
    };
  }
}
export default cartActions;
