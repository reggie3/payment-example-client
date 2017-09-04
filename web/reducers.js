export default function reducer(componentState = {}, action) {
  switch (action.type) {
    case "UPDATE_PAYMENT_STATUS":
      /* return Object.assign({}, componentState, {
        paymentStatus: action.paymentStatus,
        clientToken: actions.options.hasOwnProperty('clientToken')?
        actions.options.clientToken: componentState.clientToken
      }); */

      return Object.assign({}, componentState, {
        paymentStatus: action.paymentStatus,
        ...actions.options
      });

    case "SHOW_ACTIVITY_INDICATOR":
      return Object.assign({}, componentState, { showActivityIndicator: true });
    case "HIDE_ACTIVITY_INDICATOR":
      return Object.assign({}, componentState, {
        showActivityIndicator: false
      });
    default:
      return componentState;
  }
}
