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
import BraintreePaymentWebview from "../Components/BraintreePaymentWebview";

class BraintreePaymentScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      clientToken: null
    };
  }

  componentDidMount = () => {
    brainTreeUtils.getClientToken().then(response => {
      // console.log({ response });
      if (response.type === "success") {
        let clientToken = response.response.result.clientToken;
        this.setState({
          clientToken
        });
      }
    });
  };

  // callback to be fired once the purchase is complete
  purchaseComplete = result => {};

  render() {
    return (
      <View style={{ flex: 1 }}>
        {renderIf(this.state.clientToken === null)(
          <ActivityIndicator
            animating={true}
            style={[styles.centering, { height: 180 }]}
            size="large"
          />
        )}
        {renderIf(this.state.clientToken !== null)(
          <BraintreePaymentWebview
            clientToken={this.clientToken}
            purchaseCompleteCallpack={this.purchaseComplete}
            clientTokenOptions={{
              merchantAccountID: null,
              customerID: null
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
