let cartActions = {
    addItemToCart: (item, amount) => {
    return {
      type: "ADD_ITEM_TO_CART",
      item,
      amount
    };
  }
}
export default cartActions;
