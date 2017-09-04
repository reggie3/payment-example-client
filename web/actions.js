let actions = {
  updatePaymentStatus: function(paymentStatus, options) {
    return {
      type: "UPDATE_PAYMENT_STATUS",
      paymentStatus,
      options
    };
  },
  showActivityIndicator: function() {
    return {
      type: "SHOW_ACTIVITY_INDICATOR"
    };
  },
  hideActivityIndicator: function() {
    return {
      type: "HIDE_ACTIVITY_INDICATOR"
    };
  }
};

export default actions;
