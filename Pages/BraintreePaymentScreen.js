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
import * as brainTreeUtils from "../utils/braintreeUtils";
import renderIf from "render-if";
import { globalStyles } from "../globals/styles";
import BraintreePaymentWebview from "../web/BraintreePaymentWebview";

class BraintreePaymentScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      clientToken: "",
      paymentAPIResponse: ""
    };
  }

  componentDidMount = () => {
    brainTreeUtils
      .getClientToken({
        merchantAccountID: null,
        customerID: null      })
      .then(response => {
        // console.log({ response });
        if (response.type === "success") {
          debugger;
          let clientToken = response.response.result.clientToken;
          this.setState({
            clientToken
          });
        }
      });
  };

  /******
   * called by BraintreePaymentWebview once a nonce is recieved by
   * the webview and posts the purchase to the applicationServer
   */
  handlePaymentMethod = nonce => {
    // make api call to purchase the item using the nonce received
    // from BraintreeWebView Component
    
    brainTreeUtils
      .postPurchase(nonce, this.props.cart.totalPrice, {})
      .then(response => {
        console.log({ response });
        if (response.type === "success") {
          this.setState({ paymentAPIResponse: "purchaseSuccess" });
          this.props.dispatch(actions.cartActions.emptyCart());
        } else {
          this.setState({ paymentAPIResponse: "purchaseFailure" });
        }
      });
  };

  purchaseCompleteCallback = response => {
    console.log("purchaseCompleteCallback");
  };

  // enables payment webview to display a button that navigates back
  // to home page even though it doesn't have access to router
  navigationBackCallback = () => {
    this.props.dispatch(actions.navActions.navigateTo("Home"));
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {renderIf(this.state.clientToken === "")(
          <ActivityIndicator
            animating={true}
            style={[styles.centering, { height: 180 }]}
            size="large"
          />
        )}
        {renderIf(this.state.clientToken !== "")(
          <BraintreePaymentWebview
            clientToken={this.state.clientToken}
            handlePaymentMethod={this.handlePaymentMethod}
            navigationBackCallback={this.navigationBackCallback}
            options={{
              creditCard: true
            }}
          />
        )}
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