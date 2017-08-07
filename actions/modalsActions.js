// ACTIONS for modals portion of store

let modalsActions = {
  showErrorDialog: function(title, message) {
    return {
      type: "SHOW_ERROR_DIALOG",
      title,
      message
    };
  },
  closeErrorDialog: function() {
    return {
      type: "CLOSE_ERROR_DIALOG"
    };
  },

  // actions for the generic success dialog
  showSuccessDialog: function(title, message) {
    return {
      type: "SHOW_SUCCESS_DIALOG",
      title,
      message
    };
  },
  closeSuccessDialog: function() {
    return {
      type: "CLOSE_SUCCESS_DIALOG"
    };
  },

  showPaymentModal: function(item) {
    return {
      type: "SHOW_PAYMENT_MODAL",
      item
    };
  },
  closePaymentModal: function() {
    return {
      type: "CLOSE_PAYMENT_MODAL"
    };
  }
};

export default modalsActions;
