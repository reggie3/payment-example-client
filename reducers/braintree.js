export default function appState(braintree = {}, action) {
  switch (action.type) {
    case "GET_CLIENT_TOKEN_FULFILLED":
      debugger;
      return {clientToken: action.payload.response.result.clientToken};
    case "PURCHASE_ITEM_FULFILLED":
      return braintree;
    default:
      return braintree;
  }
}
