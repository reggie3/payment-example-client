export default function locations(cart = {}, action) {
  switch (action.type) {
    case "ADD_ITEM_TO_CART":
      let itemUpdated = false; // track whether the item gets updated
      let newItems = cart.items.map(itemInfo => {
        if (itemInfo.item.ID === action.item.ID) {
          itemUpdated = true;
          return Object.assign({}, itemInfo, { amount: itemInfo.amount + 1 });
        } else {
          return itemInfo;
        }
      });
      // itemUpdated will be false if it didn't already exist, so add it as a new item
      if (itemUpdated === false) {
        newItems.push({
          item: action.item,
          amount: action.amount
        });
      }

      let newTotalPrice = 0;
      newItems.forEach((itemInfo)=>{
        newTotalPrice += (itemInfo.amount * itemInfo.item.price)
      });

      return Object.assign({}, cart, {
        items: newItems,
        totalPrice: newTotalPrice
      });
    default:
      return cart;
  }
}
