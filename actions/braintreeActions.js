import * as braintreeUtils from '../utils/braintreeUtils';

let braintreeActions = {
  getClientToken: function() {
    return {
      type: "GET_CLIENT_TOKEN",
      payload: braintreeUtils.getClientToken()
    };
  },
purchaseItem: function() {
    return {
      type: "PURCHASE_ITEM",
      payload: braintreeUtils.postPurchase()
    };
  }
}

export default braintreeActions;