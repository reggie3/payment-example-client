import * as lambdaGet from "../utils/lambdaGet";

let inventoryActions = {
  getInventory: () => {
    return {
      type: "GET_INVENTORY",
      payload: lambdaGet.inventory()
    };
  }
};
export default inventoryActions;
