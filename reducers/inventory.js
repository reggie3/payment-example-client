import uuid from "uuid/v1";

export default function locations(inventory = {}, action) {
  switch (action.type) {
    case "GET_INVENTORY_FULFILLED":
      return action.payload.inventory;
      return;
    default:
      return inventory;
  }
}
