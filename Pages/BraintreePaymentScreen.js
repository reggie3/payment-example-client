import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import actions from "../actions/actions";
import { globalStyles } from "../globals/styles";
import BraintreePaymentWebview from "../Components/BraintreePaymentWebview";
import renderIf from "render-if";

class BraintreePaymentScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      clientToken: null,
      merchantAccountID: null,
      customerID: null
    };
  }

  formLoadPendingCallback = () => {
    console.log("formLoadPendingCallback");
  };
  formLoadCompleteCallback = (err, success) => {
    console.log({ purchaseResult });
  };
  purchasePendingCallback = (err, success) => {
    console.log("purchasePendingCallback");
  };

  purchaseCompleteCallback = (err, success) => {
    console.log({ purchaseResult });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <BraintreePaymentWebview
          customerID={this.state.customerID}
          merchantAccountID={this.state.merchantAccountID}
          formLoadPendingCallback={this.formLoadPendingCallback}
          formLoadCompleteCallback={this.formLoadCompleteCallback}
          purchasePendingCallback={this.purchasePendingCallback}
          purchaseCompleteCallback={this.purchaseCompleteCallback}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return Object.assign(
    {},
    {
      cart: state.cart
    }
  );
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  BraintreePaymentScreen
);

const styles = StyleSheet.create(
  Object.assign({}, globalStyles, {
    centering: {
      alignItems: "center",
      justifyContent: "center",
      padding: 8
    }
  })
);
