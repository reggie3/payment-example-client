let cartActions = {
  addItemToCart: (item, amount) => {
    return {
      type: "ADD_ITEM_TO_CART",
      item,
      amount
    };
  },
  emptyCart: () => {
    return {
      type: "EMPTY_CART"
    };
  }
};
export default cartActions;
